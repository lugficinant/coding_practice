import express from "express";

const app = express();
const port = 3000;

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function logger(req, res, next) {
  console.log(`the method is ${req.method}`);
  console.log(`the URL is ${req.url}`);
  next(theNext);
}

function theNext() {
  console.log("I am the next function you need <3 😎");
}
