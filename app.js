// IMPORT PACKAGES
import express from "express";
import morgan from "morgan";
import connectDB from "./config/mongoose.config.js";
import * as dotenv from "dotenv";

dotenv.config(); 

// CREATE EXPRESS APP
const app = express();
const logger = morgan("dev");

// MIDDLEWARE
app.use(express.json()); // PARSE INCOMING REQUESTS WITH JSON PAYLOADS, GIVES US ACCESS TO REQ.BODY
app.use(logger); // LOGS ALL INCOMING REQUESTS


// ROUTES


// START SERVER, MAKE EXPRESS SERVER LISTEN ON PORT
app.listen(process.env.PORT, () => {
    console.clear()
    console.log("Server is running 🏃‍♀️ on port:", process.env.PORT);
    connectDB();
});