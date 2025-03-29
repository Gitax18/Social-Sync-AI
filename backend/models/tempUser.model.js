const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    otp: String,
    expiresAt: Number,
}, { timestamps: true })

const TempUser = mongoose.model('TempUser', tempUserSchema, "tempUsers");
module.exports = TempUser;
