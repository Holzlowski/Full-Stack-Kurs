const fs = require("fs"); // Modul für Dateisystemoperationen (lesen, schreiben etc.)

// fs.writeFile("message.txt", "Hello, it's me, David", (err) => {
//     if (err) throw err;
//     console.log("Die Datei wurde erfolgreich erstellt.");
// });

// Das gleiche wie unten
// fs.readFile("message.txt", (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// })

fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
})