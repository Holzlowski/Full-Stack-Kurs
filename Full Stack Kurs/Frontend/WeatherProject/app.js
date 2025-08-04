const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "52530962daf8386f5e80abbe63e6199"
  const unit = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "a&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const wheaterData = JSON.parse(data);
      const temp = wheaterData.main.temp;
      const weatherDescription = wheaterData.weather[0].description;
      const weatherIconUrl = "http://openweathermap.org/img/wn/" + wheaterData.weather[0].icon + "@2x.png";

      res.write("<h1>Die Temperatur in " + query + " ist " + temp + " Grad Celsius.</h1>");
      res.write("<p>Das Wetter ist gerade " + weatherDescription + "<p>");
      res.write("<img src=" + weatherIconUrl + ">");
      res.send();
    })
  })
})





app.listen(3000, function() {
  console.log("Server is running on port 3000.")
})

//Chipmail Api key: 7855bf0cc0b2f81176ab2806dc5e78ea-us8

//List ID: ae1959eca0
