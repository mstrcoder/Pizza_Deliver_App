const express = require("express");
const User = require("./../models/user");
const app = express();
const catchAsync = require("./../utils/catch");
const AppError = require("./../utils/error");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// exports.Order = catchAsync(async (req, res, next) => {
//   res.redirect("/");
// });
