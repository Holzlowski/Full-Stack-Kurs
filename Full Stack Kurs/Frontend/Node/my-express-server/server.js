const express = require("express");

const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, world!<h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me at: holz92@yahoo.de");
});

app.get("/about", function(req, res){
  res.send("<h1>Hi ich heiße David</h1> <br> <p>Ich liebe Pen and Paper</p>");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
