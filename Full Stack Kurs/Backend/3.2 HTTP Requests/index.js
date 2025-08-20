import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1> <h2>This is my Homepage</h2>");
})
 
app.get("/contact", (req, res) => {
    res.send("<p>Hallo I bim David</p> <p>Mein Telefonnummer is 262626</p><p> I bims schüchtern</p>");
})

app.get("/about", (req, res) => {
    res.send("<h2> Meine Hobbys</h2><p>I bim schüchtern</p> <p>Ich mag Züge</p><p> Ich wurfel gerne Wurfel</p>");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})