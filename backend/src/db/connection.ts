import mongoose, { Connection } from 'mongoose';
import {DB_Name} from '../constants';

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance: { connection: Connection } = await mongoose.connect(
      `${process.env.MONGO_URI}`,
      {
        dbName: DB_Name,
      }
    );
    console.log(
      `\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("MongoDB connection FAILED", error.message);
    } else {
      console.log("MongoDB connection FAILED", error);
    }
    process.exit(1);
  }
};

export default connectDB;
