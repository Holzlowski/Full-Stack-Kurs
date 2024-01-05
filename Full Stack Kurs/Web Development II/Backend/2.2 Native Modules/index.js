const fs = require('fs'); // filesystem


// fs.writeFile("message.txt", "Hello from Node.js", (err) => {
//     if(err) throw err;
//     console.log("The file has been saved!");
// })

fs.readFile("./message.txt","utf8", (err, data) => {   //utf8 = Encoder
        if(err) throw err;
        console.log(data);
    })