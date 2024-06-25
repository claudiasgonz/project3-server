// IMPORT PACKAGES
import express from "express";
import morgan from "morgan";
import connectDB from "./config/mongoose.config.js";
import * as dotenv from "dotenv";
import museumRouter from './routes/museum.routes.js';
import userRouter from './routes/user.routes.js';
import reviewRouter from './routes/review.routes.js';
import cors from "cors";

dotenv.config(); 

// CREATE EXPRESS APP
const app = express();
const logger = morgan("dev");

// MIDDLEWARE
app.use(express.json()); // PARSE INCOMING REQUESTS WITH JSON PAYLOADS, GIVES US ACCESS TO REQ.BODY
app.use(logger); // LOGS ALL INCOMING REQUESTS
app.use(cors({
    origin: [process.env.REACT_URL],
})
);

// ROUTES
app.use("/user", userRouter);
app.use("/museum", museumRouter);
app.use("/review", reviewRouter);

// START SERVER, MAKE EXPRESS SERVER LISTEN ON PORT
app.listen(process.env.PORT, () => {
    console.clear()
    console.log("Server is running 🏃‍♀️ on port:", process.env.PORT);
    connectDB();
});