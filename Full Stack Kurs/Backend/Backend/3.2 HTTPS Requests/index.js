import express from "express"; // Express wird importiert
const app = express(); // Variable, die die Express App benutzt
const port = 3000;

app.get("/", (req, res) => {
  //was soll der Server bei einer Get-Anfrage auf unserer Webseite machen(/)
  // = Endpoint
  res.send("<h1>Hello<h1>");
});

app.get("/contact", (req, res) => {
  //was soll der Server bei einer Get-Anfrage auf unserer Webseite machen(/)
  // = Endpoint
  res.send("<p>Mein Wohnhaus wohnt in Wohningham<p>");
});

app.get("/about", (req, res) => {
  //was soll der Server bei einer Get-Anfrage auf unserer Webseite machen(/)
  // = Endpoint
  res.send("<h3>Its about everything, always<h3>");
});

app.listen(port, () => {
  // der Port ist der Ort, an der sich der Server befindet, um auf Request zu hören
  console.log(`Server is running on port ${port}.`); // Callback funktion, die ausgelöst wird, sobald der Server steht
});
