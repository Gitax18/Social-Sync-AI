const express = require("express");
const cors = require("cors");
const AuthRouter = require("./routes/auth.router.js");
const AiRouter = require("./routes/ai.router.js");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// routing
// app.use(AuthRouter);
app.use("/api/ai", AiRouter);

app.get("/", (req, res) => res.send("Done"));

module.exports = app;
