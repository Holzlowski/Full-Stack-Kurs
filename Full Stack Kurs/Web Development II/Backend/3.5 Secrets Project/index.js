//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var isAuthorized = false;

app.use(express.urlencoded({ extended: true })); //bodyparser is in express integriert
app.use(passwordChecker);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.send("<h1>Kein Eintritt</h1>");
    //res.redirect("/");
  }
});

function passwordChecker(req, res, next) {
  const passwordToCheck = req.body.password;
  if (passwordToCheck === "ILovePizza") {
    isAuthorized = true;
  }
  next();
}
