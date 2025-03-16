import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { render } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//`````````````````````
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Authentication",
  password: "wusheng123",
  port: 5432,
});
db.connect();
//```````````````````````````````````````
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, password]
    );
    console.log(result);
    res.render("secrets.ejs");
  } catch (err) {
    console.error(err.stack);
    res.send("this account exist already😒😒😒");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log(result);
    if (result.rows.length > 0) {
      console.log("you are logging this account 😎😎😎");
      console.log(result);
      if (password === result.rows[0].password) {
        res.render("secrets.ejs");
      } else {
        res.send("your password is incorrect😒😒😒");
      }
    } else {
      res.send("this account doesnt exist, plz try again.🤣🤣🤣");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
