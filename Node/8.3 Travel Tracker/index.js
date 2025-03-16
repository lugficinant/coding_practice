import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

//
let countries;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "lubase",
  password: "wusheng123",
  port: 5432,
});
db.connect();
//

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ```````````````wrong version

// app.get("/", (req, res) => {
//   console.log("welcome to home page");
//   //cant use await for the query function ..
//   db.query("SELECT country_code FROM visited_countries", (err, ress) => {
//     if (err) {
//       console.error(err.stack);
//     } else {
//       // countries = res.body;
//       console.log(ress.rowCount);
//       countries = ress.rows.map((cur) => cur.country_code);
//       console.log(countries);
//     }
//   });
//   res.render("index.ejs", { countries, total: countries.length });//this one should be inside of query function
//   //
// });

app.get("/", (req, res) => {
  console.log("welcome to home page");
  //Write your code here.
  db.query("SELECT country_code FROM visited_countries", (err, ress) => {
    if (err) {
      console.error(err.stack);
    } else {
      // countries = res.body;
      console.log(ress.rowCount);
      countries = ress.rows.map((cur) => cur.country_code);
      console.log(countries);
    }
    res.render("index.ejs", { countries, total: countries.length });
  });

  //
});

app.post("/add", async (req, res) => {
  console.log("here is new country~~~~~~~~~~~~~");
  console.log(req.body.country);
  let shortName;

  shortName = await db.query(
    "SELECT country_code from countries WHERE country_name = $1",
    [req.body.country]
  );
  console.log(shortName);

  if (shortName.rows.length !== 0) {
    console.log("here is your short name");
    console.log(shortName.rows[0].country_code);

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      shortName.rows[0].country_code,
    ]);

    console.log("update a new country~~~~");
    res.redirect("/");
  } else {
    const prompt = "we cant find this country, plz input again";
    res.render("index.ejs", {
      countries,
      total: countries.length,
      error: prompt,
    });
  }

  //   console.log(shortName);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
