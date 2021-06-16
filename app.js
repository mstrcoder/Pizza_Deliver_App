const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const app = express();
const Menu = require("./models/menu");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
// app.use(express.bodyParser());
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/", async (req, res) => {
  const pizzas = await Menu.find({});
  const user = {};
  const session = {};
  res.render("home", { pizzas: pizzas, user: user, session: session });
});
let a = {};
app.post("/cart", (req, res) => {
  a = req.body;
  res.status(201).json({
    status: "Success!",
  });
});
app.get("/cart", (req, res) => {
  const user = {};
  let Total_Price = 0;
  for (let pizza of Object.values(a)) Total_Price += pizza.qty * pizza.price;

  res.render("customers/cart", {
    session: a,
    user: user,
    Total_Price: Total_Price,
  });
});

module.exports = app;
