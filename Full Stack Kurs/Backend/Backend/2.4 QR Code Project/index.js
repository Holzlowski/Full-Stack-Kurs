/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import QR from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Schreib mal ein URL auf lan?", //{} weil es ein Javascript Objelt ist
      name: "URL", // ich definiere hier wie die Property genannt werden soll, in der die Antworten gespeichert werden
    },
  ])
  .then((answer) => {
    const url = answer.URL;
    //console.log(answer.URL); // Antwort wird direkt als String ausgegeben, es entsteht kein qr mit console log
    var qr_svg = QR.image(url);
    qr_svg.pipe(fs.createWriteStream("meinqr.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
