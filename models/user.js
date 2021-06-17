const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minle
    },
    role: {
        type: String,
        default: 'customer'
    }
}, {
    timestamps: true
})
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

module.exports = mongoose.model('User', userSchema)