import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var isAuthorized = false;

app.use(express.urlencoded({ extended: true })); //bodyparser is in express integriert

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  const daysOfWeek = [
    "Sonntag, die Ruhe vor dem Sturm.",
    "Montag, der müdeste Tag der Woche.",
    "Dienstag, tja jetzt hast du Dienst.",
    "Mittwoch, genau in der Mitte.",
    "Donnerstag, hat es gerade geblitzt?",
    "Freitag, endlich fre!",
    "Samstag, entspann dich.",
  ];
  const day = new Date().getDay();
  const dayOfTheWeek = daysOfWeek[day];
  // var day = new Date().getDay();
  // var dayOfTheWeek;
  // if (day == 0) {
  //   dayOfTheWeek = "Sonntag";
  // }
  // if (day == 1) {
  //   dayOfTheWeek = "Montag";
  // }
  // if (day == 2) {
  //   dayOfTheWeek = "Dienstag";
  // }
  // if (day == 3) {
  //   dayOfTheWeek = "Mittwoch";
  // }
  // if (day == 4) {
  //   dayOfTheWeek = "Donnerstag";
  // }
  // if (day == 5) {
  //   dayOfTheWeek = "Freitag";
  // }
  // if (day == 6) {
  //   dayOfTheWeek = "Samstag";
  // }
  res.render(__dirname + "/views/index.ejs", {
    day: dayOfTheWeek,
  });
});
