import express, { Request, Response, NextFunction } from 'express';
import ValidationMiddleware from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

// Route to register
router.post("/register", ValidationMiddleware.registerValidation, AuthController.register);

// Route to verify OTP
router.post("/verifyotp", ValidationMiddleware.otpValidation, AuthController.verifyOtp);

// Route to login
router.post("/login", ValidationMiddleware.loginValidation, AuthController.logIn);

export default router;
