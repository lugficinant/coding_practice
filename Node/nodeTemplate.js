import express from "express";
import axios from "axios";
//
import axios from "axios";
//parse
import bodyParser from "body-parser";
//
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//static file
app.use(express.static("public"));

//have a app
const app = express();

//home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
