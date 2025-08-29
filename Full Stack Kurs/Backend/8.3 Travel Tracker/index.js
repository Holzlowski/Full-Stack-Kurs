import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
let visitedCountries = []; // ✅ Leeres Array statt undefined
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

db.connect();

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  visitedCountries = result.rows.map(row => row.country_code);
  //console.log(visitedCountries)
  res.render("index.ejs", { 
    countries: visitedCountries, 
    total: visitedCountries.length,
    error: null
  });
});

app.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const newCountry = req.body.country;
    
    // Prüfe ob das Land existiert
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || LOWER($1) || '%'",
      [newCountry]
    );
    
    if(result.rows.length > 0) {
      const newCountryCode = result.rows[0].country_code;
      console.log(newCountryCode);
      
      // Versuche das Land hinzuzufügen
      await db.query( 
        "INSERT INTO visited_countries (country_code) VALUES ($1)", 
        [newCountryCode]
      );
      
      res.redirect("/");
    } else {
      // Land existiert nicht in der countries Tabelle
      res.render("index.ejs", {
        countries: visitedCountries,
        total: visitedCountries.length,
        error: "Land existiert nicht. Bitte überprüfen Sie die Schreibweise."
      });
    }
  } catch (err) {
    console.log("Error:", err);
    
    let errorMessage = "Ein Fehler ist aufgetreten.";
    
    // Prüfe ob es ein Unique Constraint Fehler ist
    if (err.code === '23505') {
      errorMessage = "Dieses Land ist bereits in Ihrer Liste!";
    }
    
    res.render("index.ejs", {
      countries: visitedCountries,
      total: visitedCountries.length,
      error: errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
