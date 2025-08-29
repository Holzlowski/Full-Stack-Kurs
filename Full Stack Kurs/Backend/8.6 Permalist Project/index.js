import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC")
    items = result.rows;
    // console.log(items);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  // Validierung hinzufügen
  if (!item || item.trim().length === 0) {
    return res.redirect("/");
  }

  try {
    await db.query("INSERT INTO items (item_name) VALUES ($1)",
      [item]
    );
    items.push({ title: item });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.post("/edit", (req, res) => {
  const itemId = req.body.updatedItemId;
  const updatedItemTitle = req.body.updatedItemTitle;
  try {
    db.query("UPDATE items SET title = ($1) WHERE id = ($2)",
      [updatedItemTitle, itemId]
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

});

app.post("/delete", (req, res) => {
  try {
    db.query("DELETE FROM items WHERE id = ($1)",
      [req.body.deleteItemId]
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
