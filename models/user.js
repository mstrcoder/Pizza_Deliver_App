const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Please Tell Your name"],
    },
    email: {
      type: "string",
      required: [true, "Please Tell Your email"],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, "Please provide valid Email"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    password: {
      type: "string",
      required: [true, "Please provide a valid password"],
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.isPasswordCorrect = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
