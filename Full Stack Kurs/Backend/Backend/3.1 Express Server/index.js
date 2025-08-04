import express from "express"; // Express wird importiert
const app = express(); // Variable, die die Express App benutzt
const port = 3000;

app.listen(port, () => {
  // der Port ist der Ort, an der sich der Server befindet, um auf Request zu hören
  console.log(`Server is running on port ${port}.`); // Callback funktion, die ausgelöst wird, sobald der Server steht
});
