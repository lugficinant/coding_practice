/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import qr from "qr-image";
import inquirer from "inquirer";
import fs from "fs";
let userInput;
inquirer
  .prompt([
    /* Pass your questions in here */
    // "input something my boy",
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    console.log("666");
    const url = answers.URL;
    // Use user feedback for... whatever!!

    var qr_svg = qr.image(url);
    console.log("666");
    fs.writeFile("input.txt", url, (err) => {
      if (err) console.log(err);
      console.log("the file has been saved");
    });
    console.log("666");
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
