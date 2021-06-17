const express = require("express");
const User = require("./../models/user");
const app = express();
const catchAsync = require("./../utils/catch");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
    return jwt.sign({
            id: id,
        },
        "hello-bhayya-kese-ho-aap", {
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
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return next(new Array("Please Enter the Email and Password", 404));
    }
    const user = await User.findOne({
        email
    });
    if (!user) {
        return next(new Array("Please Enter the Correct Email and Password", 404));
    }
    const correct = await user.isPasswordCorrect(password, user.password);
    if (!correct) {
        return next(new Array("Please Enter the Correct Password", 404));
    }
    const token = signToken(user._id);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    });
    res.status(201).json({
        status: "Success!",
        token,
    });
});