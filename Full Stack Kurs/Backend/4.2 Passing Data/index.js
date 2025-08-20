import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;
let nameData = undefined;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {nameData: undefined})
});

app.post("/submit", (req, res) => {
  const fullName = req.body.fName + req.body.lName;
  const numberOfLetters = fullName.length;
  nameData = {
    forName: req.body.fName,
    lastName: req.body.lName,
    fullName: fullName,
    numberOfLetters: numberOfLetters
  }
  console.log(nameData)
  
 res.render("index.ejs", {nameData: nameData});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
