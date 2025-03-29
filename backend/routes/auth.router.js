const express = require("express");
const { registerValidation, otpValidation, loginValidation} = require("../middlewares/auth.middleware.js");
const { register, verifyOtp, logIn} = require("../controllers/auth.controller.js");

const router = express.Router();

// router to register 
router.post("/register", registerValidation, register);

// router to verify otp
router.post("/verifyotp", otpValidation, verifyOtp);

// router to login 
router.post("/login", loginValidation, logIn);

module.exports = router;
