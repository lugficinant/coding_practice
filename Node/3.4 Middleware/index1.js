import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

//this is dynamic path used for locate our home HTML file
const __dirname = dirname(fileURLToPath(import.meta.url));

//this middleware will pre-process the requests, the res will have a body attribute.
//bodyParser.date(choose what knid of data you wan to parse)😎
//now, every request has own body
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  console.log(req.body);
});

//send it home HTML file back
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
