import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var count;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const letterCount = req.body.fName.length + req.body.lName.length;

  res.render("index.ejs", { count: letterCount });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
