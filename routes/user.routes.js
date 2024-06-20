import express from 'express';
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

const router = express.Router()

router.post("/signup", async (req, res) => {
    try {
       const {email, username, password} = req.body

       if(!email || !password || !username){
        return res
        .status(400)
        .json({message: "Account was not created. Please provide email, username, and password."});
       }
       
       const foundUser = User.findOne({$or: [{email}, {username}]})
       if(foundUser){
            return res
            .status(400)
            .json({message: "The email or username you are trying to use is already registered to an account."});
       }

    // Regex to validate email (checks if theres word@word.com format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // Use regex to validate the password format
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 8 characters and contain at least one number, one lowercase, one uppercase letter and a special character.",
      });
      return;
    }

    const salts = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salts);

    const createdUser = await User.create({
        email, 
        username, 
        password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", createdUser });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
export default router;