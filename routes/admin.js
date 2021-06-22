const express = require("express");
const Order = require("./../models/order");
const app = express();
const catchAsync = require("./../utils/catch");
const AppError = require("./../utils/error");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
exports.Myorders = catchAsync(async (req, res, next) => {
  if (req.user?.role !== "admin") {
    next(new AppError("You Are Not Authorised To Access This route", 500));
  }
  const orders = await Order.find({ status: { $ne: "completed" } }, null, {
    sort: { createdAt: -1 },
  });
  if (!orders) {
    next(new AppError("Cannot Found The Route", 404));
  }
  res.render("admin/orders", {
    session: {},
    orders: orders,
  });
});

exports.status = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId);
  order.status = req.body.status;
  await order.save();
  res.redirect("/admin/orders");
});
