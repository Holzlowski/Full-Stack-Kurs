/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs"
import inquirer from "inquirer";
import qr from "qr-image"

inquirer.prompt([
    {
        type: "input",
        name: "url",
        message: "Schreib deine LieblingsURL hier rein bitte:"
    }
])
    .then((answers) => {
        const url = answers.url;
        
        // 2. QR Code erstellen
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream("websiteQr.png"));

        // 3. URL in Textdatei speichern
        fs.writeFileSync("user_input.txt", url);
        
        console.log("QR Code und Textdatei erstellt!");
    }).catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment")
        } else {
            console.log("Something else went wrong")
        }
    });

