const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config();

// middleware for register validation
const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400)
            .json({ message: "Bad request", error })
    }

    next();
}

// middleware for otp validation
const otpValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().max(6)
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400)
            .json({ message: "Bad request", error })
    }

    next();
}

// middleware for login validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400)
            .json({ message: "Bad request", error })
    }

    next();
}

module.exports = { registerValidation, otpValidation, loginValidation }
