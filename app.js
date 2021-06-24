const express = require("express");
const passport = require("passport");
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
const Admin = require("./routes/admin");
const Pizza = require("./routes/pizza");
const Parser = require("cookie-parser");
const session = require("express-session");
const cookieSession = require("cookie-session");
const compression = require('compression');

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
app.use(cors());
app.use(compression());
// app.use(session({ secret: "hello-bhayya-kese-ho-aap" }));
app.use(
  cookieSession({
    name: "session-name",
    keys: ["key1", "key2"],
  })
);
require("./passport");
app.use(passport.initialize());
app.use(passport.session());

app.get("/", Auth.isLogeedIn, Pizza.getPizaa);
app.post("/cart", Auth.Protect, Pizza.Save);
app.get("/cart", Auth.isLogeedIn, Pizza.AddToCart);
app.get("/login", (req, res, next) => {
  res.render("auth/login", {
    messages: {},
    user: {},
    session: {},
  });
});
app.get("/register", (req, res, next) => {
  res.render("auth/register", {
    messages: {},
    user: {},
    session: {},
  });
});
app.get(
  "/auth/google",
  cors(),
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  Auth.googleAuth
);
app.get("/admin/orders", Auth.isLogeedIn, Admin.Myorders);
app.post("/admin/order/status", Auth.isLogeedIn, Admin.status);
app.post("/register", Auth.signup);
app.post("/login", Auth.login);
app.post("/logout", Auth.logout);
app.post("/orders", Auth.isLogeedIn, Order.placeOrder);
app.get("/customer/orders", Auth.Protect, Order.findOrders);
app.get("/customer/orders/:id", Auth.Protect, Order.TrackOrder);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot Find The Route`, 404));
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let user = req.user || {};
  res
    .status(err.statusCode)
    .render("errors/404", { session: {}, error: err, user: user });
});
module.exports = app;
