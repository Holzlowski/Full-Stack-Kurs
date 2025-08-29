import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session Konfiguration
// Erforderlich für Passport Authentication
app.use(session({
  secret: process.env.SESSION_SECRET,  // Schlüssel zum Verschlüsseln der Session
  resave: false,                       // Session nicht bei jeder Anfrage speichern
  saveUninitialized: true,             // Auch leere Sessions speichern
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,      // Cookie hält 1 Tag lang (in Millisekunden)
  }
}));

// Passport Middleware initialisieren
// Muss nach session() aber vor den Routes stehen
app.use(passport.initialize());  // Passport initialisieren
app.use(passport.session());     // Passport Sessions aktivieren

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated) {
    res.render("secrets,ejs");
  } else {
    res.redirect("/login");
  }
})

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log(err);
            res.redirect("/secrets")
          })
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login Route mit Passport Authentication
// Verwendet die "local" Strategy (Username/Password)
// Bei erfolgreichem Login: Weiterleitung zu "/secrets"
// Bei fehlgeschlagenem Login: Weiterleitung zurück zu "/login"
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

// Passport Local Strategy Konfiguration
// Wird automatisch von passport.authenticate("local") aufgerufen
// Parameter: username, password (aus dem Login-Formular), cb (callback)
passport.use(new Strategy(async function verify(username, password, cb) {
  console.log(username);

  try {
    // 1. User in der Datenbank suchen
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      
      // 2. Passwort mit bcrypt vergleichen
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err)  // Fehler beim Passwort-Vergleich
        } else {
          if (result) {
            return cb(null, user);  // Login erfolgreich, User-Objekt zurückgeben
          } else {
            return cb(null, false); // Falsches Passwort
          }
        }
      });
    } else {
      return cb("User not found");  // User existiert nicht
    }
  } catch (err) {
    return cb(err);  // Datenbankfehler
  }
}))

// Passport Session Management
// serializeUser: Bestimmt, welche User-Daten in der Session gespeichert werden
passport.serializeUser((user, cb) => {
  cb(null, user);  // Komplettes User-Objekt speichern
})

// deserializeUser: Lädt User-Daten aus der Session
passport.deserializeUser((user, cb) => {
  cb(null, user);  // User-Objekt aus Session laden
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});