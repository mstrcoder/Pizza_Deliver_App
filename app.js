const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const app = express();
const Menu = require("./models/menu");
const bodyParser = require("body-parser");
const cors = require("cors");
const AppError = require("./utils/error");
const catchAsync = require("./utils/catch");
const Auth = require("./routes/user");
const Order = require("./routes/order");
const Parser = require("cookie-parser");
const session = require("express-session");
app.use(bodyParser.json());
app.use(expressLayout);
app.use(Parser());
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(session({ secret: "hello-bhayya-kese-ho-aap" }));

app.use(cors());
app.get(
  "/",
  Auth.isLogeedIn,
  catchAsync(async (req, res, next) => {
    const pizzas = await Menu.find({});
    if (!pizzas) {
      next(new AppError("Cannot find Pizza in DB😢 ", 404));
    }
    const session = {};
    res.render("home", {
      pizzas: pizzas,
      session: session,
    });
  })
);
let a = {};
app.post(
  "/cart",
  Auth.Protect,
  catchAsync(async (req, res, next) => {
    a = req.body;
    res.status(201).json({
      status: "Success!",
    });
  })
);
app.get(
  "/cart",
  Auth.isLogeedIn,
  catchAsync(async (req, res, next) => {
    let Total_Price = 0;
    if (Object.keys(a).length == 0) {
      next(new AppError("Need to Add Pizza to Add to cart", 404));
    } else {
      for (let pizza of Object.values(a))
        Total_Price += pizza.qty * pizza.price;
      req.session.cart = a;
      req.session.Total_Price = Total_Price;
      res.render("customers/cart", {
        session: a,
        Total_Price: Total_Price,
      });
    }
  })
);
app.get("/login", (req, res, next) => {
  res.render("auth/login", { messages: {}, user: {}, session: {} });
});
app.get("/register", (req, res, next) => {
  res.render("auth/register", { messages: {}, user: {}, session: {} });
});
app.post("/register", Auth.signup);
app.post("/login", Auth.login);
app.post("/logout", Auth.logout);
app.post("/orders", Auth.isLogeedIn, Order.placeOrder);
app.get("/customer/orders", Auth.isLogeedIn, Order.findOrders);
app.get("/customer/orders/:id", Auth.Protect, Order.TrackOrder);
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot Find The Route`, 404));
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
