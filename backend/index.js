const dotenv = require("dotenv");
const connectDB = require("./db/connection.js");
const app  = require("./app.js");

dotenv.config();

// connecting to MongoDB and setting up server
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 3000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed! ", error);
    })
