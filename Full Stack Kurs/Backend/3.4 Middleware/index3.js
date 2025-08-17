import express from "express";

const app = express();
const port = 3000;

// Eigene Middleware
function logger(req, res, next) {
  console.log("Request Method: " + req.method);
  console.log("Request URL: " + req.url);
  next(); // ist notwendig, sonst wird die get Route nicht erreicht
}

// Damit schalte ich die Middleware ein
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
