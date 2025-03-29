const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TempUser = require("../models/tempUser.model.js");
const User = require("../models/user.model.js");
const { generateOtp, sendOtpToMail } = require("../utils/mail.util.js");

// controller for register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        // if user already exist
        if (user) {
            return res.status(409)
                .json({ message: "User is already exist, Please login", success: false });
        }

        // if user tries to attempt multiple signups without verifying otp
        await TempUser.deleteMany({ email });

        // generate otp and its expiration
        const otp = generateOtp();
        const expiresAt = new Date().getTime() + 3600000;

        // creating temp user
        const tempUser = new TempUser({ username, email, password, otp: otp, expiresAt: expiresAt });
        // hashing password before saving in DB
        tempUser.password = await bcrypt.hash(password, 10);

        // sending otp to mail
        sendOtpToMail(email, otp);
        // save the temp user
        await tempUser.save();

        res.status(201)
            .json({
                message: "OTP has been sent to your mail",
                success: true
            })
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

// conroller to verify otp
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const tempUser = await TempUser.findOne({ email });

        // if user email not matched 
        if (!tempUser) {
            res.status(403)
                .json({
                    message: "Email does not matched, please check your mail",
                    success: false
                });
        }

        // if user otp expires after 1 hour
        if (tempUser.expiresAt < new Date().getTime()) {
            res.status(410)
                .json({
                    message: "OTP Expires, please sign up again",
                    success: false
                });
        }

        // if request body otp equals to db otp
        const isEqual = otp == tempUser.otp;

        // if is equal then save new user
        if (isEqual) {
            const user = new User({
                username: tempUser.username,
                email: tempUser.email,
                password: tempUser.password,
            });

            await TempUser.deleteMany({ email });
            await user.save();

            const jwtToken = jwt.sign(
                { email: user.email, _id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            )

            res.status(201)
                .json({
                    message: "SignedUp successfully",
                    success: true,
                    jwtToken: jwtToken,
                    email: email,
                    name: user.username
                });
        } else {
            res.status(400).json({ 
                message: "OTP is not valid",
                success: false  
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({
            message: "Internal server error",
            success: false,
        })
    }
}

// controller for login
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = "email or password is wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // checking is password correct by comparing db password to client password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken: jwtToken,
                email: email,
                name: user.username
            })
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

module.exports = { register, verifyOtp, logIn };
