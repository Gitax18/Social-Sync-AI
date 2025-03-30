import mongoose, { Document, Schema } from 'mongoose';

interface ITempUser extends Document {
  username: string;
  email: string;
  password: string;
  otp?: string;
  expiresAt?: number;
}

const tempUserSchema = new Schema<ITempUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  expiresAt: {
    type: Number,
  },
}, { timestamps: true });

const TempUser = mongoose.model<ITempUser>('TempUser', tempUserSchema, 'tempUsers');

export default TempUser;
