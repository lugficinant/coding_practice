import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { render } from "ejs";

const app = express();
const port = 3000;
//
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "lubase",
  password: "wusheng123",
  port: 5432,
});
db.connect();
//

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users;

////////////////////////
//design database 😎😎😎
//figure it out the structure of route 😒😒😒😒
//render home page
//switch user

//add user

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

//home page

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  let users = (await db.query("SELECT * FROM users")).rows;
  // console.log(userss);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

//
app.post("/add", async (req, res) => {
  console.log(req.body);
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1,$2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//switch user
app.post("/user", async (req, res) => {
  console.log(req.body);
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const color = req.body.color;
  const result = await db.query(
    "INSERT INTO users(name,color) VALUES($1,$2) RETURNING *",
    [name, color]
  );
  console.log(result);
  currentUserId = result.rows[0].id;
  res.redirect("/");

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
