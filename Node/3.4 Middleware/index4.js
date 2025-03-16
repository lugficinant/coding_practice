import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

//

const app = express();
const port = 3000;
//have a dynamic file path of our HOME HTML
const __dirname = dirname(fileURLToPath(import.meta.url));
//we need detail info(street and pet) by using middleware
app.use(bodyParser.urlencoded({ extended: true }));

//
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  //if you dont send back anything, the webpage will be stucked cuz didnt get any new HTML file 😒😒😒
  res.send(
    `<h1>Your band name is:</h1>${req.body.street}${req.body.pet} 😘<h2>`
  );
});
