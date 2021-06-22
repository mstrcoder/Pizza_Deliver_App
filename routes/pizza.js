const express = require("express");
const Menu = require("./../models/menu");
const app = express();
const catchAsync = require("./../utils/catch");
const AppError = require("./../utils/error");
exports.getPizaa = catchAsync(async (req, res, next) => {
  const pizzas = await Menu.find({});
  if (!pizzas) {
    next(new AppError("Cannot find Pizza in DB😢 ", 404));
  }
  const session = {};
  res.status(200).render("home", {
    pizzas: pizzas,
    session: session,
  });
});
let a = {};
exports.Save = catchAsync(async (req, res, next) => {
  a = req.body;
  res.status(201).json({
    status: "Success!",
  });
});
exports.AddToCart = catchAsync(async (req, res, next) => {
  let Total_Price = 0;
  if (Object.keys(a).length == 0) {
    next(new AppError("Need to Add Pizza to Add to cart", 404));
  } else {
    for (let pizza of Object.values(a)) Total_Price += pizza.qty * pizza.price;
    req.session.cart = a;
    req.session.Total_Price = Total_Price;
    res.render("customers/cart", {
      session: a,
      Total_Price: Total_Price,
    });
  }
});
