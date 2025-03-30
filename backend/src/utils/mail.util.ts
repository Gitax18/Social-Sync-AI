import nodemailer, { Transporter } from "nodemailer";

const host = process.env.HOST_SERVICE ?? "localhost";
const port = parseInt(process.env.SMTP_PORT ?? "587", 10);

// Create transporter using SendGrid API key
const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP (One-Time Password)
const generateOtp = (): number => {
  const otp = Math.floor(100 + Math.random() * 900);
  return otp;
};

// Send OTP to email
const sendOtpToMail = async (email: string, otp: number) => {
  const textMessage = `Your OTP for verification is: ${otp}. Do not share this OTP with anyone. If you did not request this, please ignore this message.`;
  
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_HOST!,
      to: email,
      subject: 'OTP verification for Signup',
      text: textMessage,
    });
    console.log(res);
    if (res) return true;
  } catch (error) {
    console.error(error);
    throw new Error(`Error in sending OTP: ${error}`);
  }
};

// Export functions
export { generateOtp, sendOtpToMail };
