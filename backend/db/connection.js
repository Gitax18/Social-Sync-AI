const mongoose = require("mongoose");
const DB_Name = require("../constants.js")

 const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}${DB_Name}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection FAILED", error);
        process.exit(1);
    }
}

module.exports = connectDB;
