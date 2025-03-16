import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//database

let items;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "lubase",
  password: "wusheng123",
  port: 5432,
});
db.connect();

//function
async function items_data() {
  //retrieve items
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  //
  // console.log(result.rows);
  return result.rows;
}

//route
//homepage
app.get("/", async (req, res) => {
  const items = await items_data();
  console.log("Here is home page and all your items _______😎");
  console.log(items);

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

//add new the items
app.post("/add", async (req, res) => {
  console.log(req.body);
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1) ", [item]);
  res.redirect("/");
});

//edit items
app.post("/edit", async (req, res) => {
  console.log(req.body);
  const newTitle = req.body.updatedItemTitle;
  const updateId = parseInt(req.body.updatedItemId);
  await db.query("UPDATE items SET title = $1 WHERE id = $2", [
    newTitle,
    updateId,
  ]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  console.log(req.body);
  const deleteId = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1", [deleteId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
