const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const port = 8080;
app.listen(port, () => {
  console.log(`server is listening to port: ${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Blogpage",
  password: "#07080900Vp",
});

// let createRandomUser = () => {
//   return [
//     //return array instead of object
//     faker.string.uuid(),
//     faker.internet.userName(),
//     faker.image.url(),
//     faker.lorem.lines({ min: 2, max: 3 }),
//   ];
// };

// let q = "INSERT INTO user (id, username, url, caption) VALUES ?";
// let data = [];

// for (let i = 1; i <= 100; i++) {
//   data.push(createRandomUser());
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();

app.get("/home", (req, res) => {
  let q = "SELECT count(*) FROM user"; //total no. of user
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      console.log(count);
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log("some err", err);
  }
});

app.get("/posts", (req, res) => {
  let q = "SELECT * FROM user ORDER BY username"; //select all
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("show.ejs", { users });
    });
  } catch (err) {
    console.log("some err", err);
  }
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, url, caption } = req.body;

  let q = `INSERT INTO user (id, username, url, caption) VALUES (?,?,?,?)`; //insert query

  try {
    connection.query(q, [id, username, url, caption], (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  } catch (err) {}
  res.redirect("/posts");
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;

  let q = `SELECT * FROM user WHERE id='${id}'`; //select query based on id
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user);
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log("some err", err);
  }
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newCaption = req.body.caption;

  let q = `UPDATE user SET caption='${newCaption}' WHERE id='${id}'`; //update row sql query
  try {
    connection.query(q, (err, result) => {
      console.log("Succes", result);
    });
  } catch (err) {
    console.log("some err", err);
  }
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;

  let q = `DELETE FROM user WHERE id='${id}'`; //delete tuple sql query

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("Succes", result);
      res.redirect("/posts");
    });
  } catch (err) {
    console.log("some err", err);
  }
});
