const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/ae1959eca0";

const options = {
  method: "POST",
  auth: "holzi:a7855bf0cc0b2f81176ab2806dc5e78ea-us8"
};

const request = https.request(url, options, function(response) {

if (response.statusCode == 200) {
  res.sendFile(__dirname + "/sucess.html");
}
else {
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data) {
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});


app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Verbindung läuft JUUUUNGE! Auf Port 3000");
})

//7855bf0cc0b2f81176ab2806dc5e78ea-us8
