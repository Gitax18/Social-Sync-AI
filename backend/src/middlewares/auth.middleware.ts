import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

class ValidationMiddleware {

  // Register validation
  public static registerValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: 'Bad request', error });
    }

    next();
  }

  // OTP validation
  public static otpValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().max(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: 'Bad request', error });
    }

    next();
  }

  // Login validation
  public static loginValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: 'Bad request', error });
    }

    next();
  }
}

export default ValidationMiddleware;
