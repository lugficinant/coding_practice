import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const data = {
  title: "Enter your name below 😘😘😘",
  fullName: "",
};

app.get("/", (req, res) => {
  res.render("index.ejs", data);
});

//when you hit button sumit, will send a req include info such as fName and lName
//server receive the info to process data, then send back a html to render.😘😘😘
app.post("/submit", (req, res) => {
  console.log(req.body);
  data.fullName = req.body.fName + req.body.lName;
  res.render("index.ejs", data);
  data.fullName = "";
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
