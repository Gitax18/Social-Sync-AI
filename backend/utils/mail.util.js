const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.EMAIL_APITOKEN,
        },
    })
);

// generate otp 
const generateOtp = () => {
    const otp = Math.floor(100 + Math.random() * 900);
    console.log(otp);
    return otp;
};

// send otp to mail
const sendOtpToMail = async (email, otp) => {
    const textMessage = `Your OTP for verification is: ${otp}. Do not share this OTP with anyone. If you did not request this, please ignore this message.`;
    try {
        await transporter
            .sendMail({
                from: process.env.EMAIL_HOST,
                to: email,
                subject: "OTP verification for Signup",
                text: textMessage,
            })
            .then((response) => true)
            .catch((error) => false)
    } catch (error) {
        console.log(error);
        throw new Error("Error in sending OTP: " + error);
    }
};

module.exports = { generateOtp, sendOtpToMail }
