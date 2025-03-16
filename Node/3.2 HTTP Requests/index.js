import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`now we are listening the port ${port}`);
});

//add a function to handle / request
app.get("/", (req, res) => {
  //req showcase
  //   console.log(req.rawHeaders);
  //send something back
  res.send("<h1>Hello Lupo</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About me , I am LUPO 😎</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>My contact</h1> <h2>0449651666666</h2>");
});
