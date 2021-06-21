const express = require("express");
const User = require("./../models/user");
const app = express();
const catchAsync = require("./../utils/catch");
const AppError = require("./../utils/error");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    "hello-bhayya-kese-ho-aap",
    {
      expiresIn: "90d",
    }
  );
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  res.status(201).json({
    status: "Success!",
    token,
    data: {
      user: user,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please Enter the Email and Password", 404));
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return next(
      new AppError("Please Enter the Correct Email and Password", 404)
    );
  }
  const correct = await user.isPasswordCorrect(password, user.password);
  if (!correct) {
    return next(new AppError("Please Enter the Correct Password", 404));
  }
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.redirect("/");
  // res.status(201).json({
  //   status: "Success!",
  //   token,
  // });
});
exports.Protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not Logged In please login", 401));
  }

  //Verification the Token and
  const decoded = await promisify(jwt.verify)(
    token,
    "hello-bhayya-kese-ho-aap"
  );

  // Check if user still Exist
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError("No Longer User Exist", 401));
  }

  req.user = freshUser;
  res.locals.user = freshUser;

  next();
});
exports.isLogeedIn = async (req, res, next) => {
  let token;
  res.locals.user = {};
  if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      // console.log(token);

      //Verification the Token and
      const decoded = await promisify(jwt.verify)(
        token,
        "hello-bhayya-kese-ho-aap"
      );

      // Check if user still Exist
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      // console.log(freshUser);
      //There is an Login User
      //this way we can store locally any thing PUG template can access to it

      req.user = freshUser;
      res.locals.user = freshUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggesout", {
    expires: new Date(Date.now() + 10 * 1000),
    // secure: true,
    httpOnly: true,
  });
  // res.status(200).json({
  //   status: "success",
  // });
  res.redirect("/");
};
exports.googleAuth = async (req, res, next) => {
  const email = req.user.emails[0].value;
  const name = req.user.displayName;
  let user = await User.findOne({ email: email });
  if (!user) {
    user = await User.create(
      { email: email, name: name },
      {
        runValidators: false,
      }
    );
  }
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.redirect("/");
};
// exports.restrictTo = (req, res, next) => {
//   //roles is an array  [admin,leadguide]
//   // console.log(roles, req.user);
//   if (req.user && "admin" === req.user.role) {
//     res.redirect("/admin/orders");
//     // return next(new AppError("You do not have Presmission To Do this", 401));
//   }
//   res.redirect("/");
// };
