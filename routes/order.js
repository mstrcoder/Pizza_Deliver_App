const express = require("express");
const app = express();
const AppError = require("./../utils/error");
const catchAsync = require("./../utils/catch");
const Order = require("./../models/order");
exports.placeOrder = catchAsync(async (req, res, next) => {
  // console.log(req.user._id, req.session.cart, req.session.Total_Price);
  if (!req.user._id || !req.session.cart || !req.session.Total_Price) {
    return next(
      new AppError(
        "Either you have not added into cart or You have already Ordered the Item",
        404
      )
    );
  }
  req.body.customerId = req.user._id;
  req.body.items = req.session.cart;

  const order = await Order.create(req.body);
  if (!order) {
    return next(new AppError("Your order Cannot be Completed", 404));
  }
  res.send("Your order Created");
});

exports.findOrders = catchAsync(async (req, res, next) => {
  const order = await Order.find({ customerId: req.user._id });
  res.render("./customers/orders", {
    orders: order,
    messages: {},
    session: {},
  });
});
exports.TrackOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("Cannot Find The order", 404));
  }
  res.render("./customers/singleOrder", {
    order: order,
    messages: {},
    session: {},
  });
});
