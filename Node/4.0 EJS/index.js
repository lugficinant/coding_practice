import express from "express";

const port = 3000;
const app = express();
const today = new Date();
const dayType = today.getDay();

//
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
app.get("/", (req, res) => {
  if (dayType === 0 || dayType === 5) {
    res.send("<h1>Hey, it's a weekend, it's time to have fun!😘😘😘</h1>");
  } else
    res.send(`<h1>Hey, it's a weekday, it's time to work hard!😎😎😎</h1>`);
});

//
