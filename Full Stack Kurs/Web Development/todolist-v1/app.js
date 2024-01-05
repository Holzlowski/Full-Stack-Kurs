const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  switch (currentDay) {
    case 0:
      day = "Sonntag";
      break;
    case 1:
      day = "Montag";
      break;
    case 2:
      day = "Dienstag";
      break;
    case 3:
      day = "Mittwoch";
      break;
    case 4:
      day = "Donnerstag";
      break;
    case 5:
      day = "Freitag";
      break;
    case 6:
      day = "Samstag";
      break;

    default:
      console.log("Error: Der ausgewählte Tag ist: " + currentDay);
  }

  res.render("list", {
    kindOfDay: day
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
