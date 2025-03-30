import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import TempUser from '../models/tempUser.model';
import User from '../models/user.model';
import { generateOtp, sendOtpToMail } from '../utils/mail.util';

class AuthController {
  
  // Register method
  public static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email });
      
      // if user already exists
      if (user) {
        return res.status(409).json({ message: 'User is already exist, Please login', success: false });
      }

      // if user attempts multiple signups without verifying OTP
      await TempUser.deleteMany({ email });

      // generate OTP and its expiration time
      const otp = generateOtp();
      const expiresAt = new Date().getTime() + 3600000; // OTP valid for 1 hour

      // create a temp user
      const tempUser = new TempUser({ username, email, password, otp, expiresAt });
      
      // hash the password before saving
      tempUser.password = await bcrypt.hash(password, 10);

      // send OTP to the provided email
      sendOtpToMail(email, otp);

      // save the temporary user to DB
      await tempUser.save();

      res.status(201).json({
        message: 'OTP has been sent to your mail',
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  }

  // Verify OTP method
  public static async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const tempUser = await TempUser.findOne({ email });

      // if user email not matched
      if (!tempUser) {
        return res.status(403).json({
          message: 'Email does not match, please check your mail',
          success: false,
        });
      }

      // if OTP has expired
      if (tempUser?.expiresAt! < new Date().getTime()) {
        return res.status(410).json({
          message: 'OTP has expired, please sign up again',
          success: false,
        });
      }

      // compare OTP from the request body and the one stored in DB
      if (otp === tempUser.otp) {
        // create the new user
        const user = new User({
          username: tempUser.username,
          email: tempUser.email,
          password: tempUser.password,
        });

        // remove the temp user
        await TempUser.deleteMany({ email });

        // save the new user to the database
        await user.save();

        // create JWT token
        const jwtToken = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET as string,
          { expiresIn: '24h' }
        );

        res.status(201).json({
          message: 'Signed up successfully',
          success: true,
          jwtToken,
          email: user.email,
          name: user.username,
        });
      } else {
        res.status(400).json({
          message: 'OTP is not valid',
          success: false,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  }

  // LogIn method
  public static async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const errorMsg = 'Email or password is incorrect';
      if (!user) {
        return res.status(403).json({ message: errorMsg, success: false });
      }

      // check if password matches
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).json({ message: errorMsg, success: false });
      }

      // create JWT token
      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: 'Login successful',
        success: true,
        jwtToken,
        email: user.email,
        name: user.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  }
}

export default AuthController;
