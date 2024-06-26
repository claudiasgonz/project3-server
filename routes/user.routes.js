import express from 'express';
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import isAuth from "../middleware/authentication.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router()

router.post("/signup", async (req, res) => {
    try {
       const {email, username, password} = req.body

       if(!email || !password || !username){
        return res
        .status(400)
        .json({ message: "Account was not created. Please provide email, username, and password." });
       }
       
       const foundUser = await User.findOne({ $or: [{email}, {username}] });
       
       if(foundUser){
            return res
            .status(400)
            .json({ message: "The email or username you are trying to use is already registered to an account." });
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
        console.log("Error while creating user",error);
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, username, password } = req.body;
        // CHECKS IF REQ BODY HAS ALL INFO (EMAIL OR USERNAME AND PASSWORD)
        if (!(email || username) || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email or username and password" });
        }

        // CHECKS IF USER EXISTS BY LOOKING FOR THEM THROUGH EMAIL OR USERNAME
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res
            .status(401)
            .json({ message: "User does not exist" });
        }

        // CHECKS IF PASSWORD IS CORRECT, USING BCRYPT TO COMPARE USER INPUT AND PASSWORD IN DB
        const passwordCheck = await bcrypt .compare(password, user.password);

        if (!passwordCheck) {
          return res
            .status(401)
            .json({ message: "Email/Username or password incorrect" });
        }

        // DELETE USER PASSWORD FROM USER VARIABLE SO WE CAN USE AS PAYLOAD
        delete user._doc.password;

        const jwtToken = jwt.sign(
            { payload: user },
            process.env.TOKEN_SIGN_SECRET,
            {
             algorithm: "HS256",
             expiresIn: "24h",
            }
        );

        res.json({ user, authToken: jwtToken });
    } catch (error) {
        console.log("Error while deleting user",error);
        res.status(500).json(error);
    }
});

router.get("/verify", isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ message: "User is logged in.", user });
    } catch (error) {
        console.log("Error while verifying", error);
        res.status(500).json(error);
    }
});

router.get("/admin", isAuth, isAdmin, async (req, res) => {
    try {
        res.json({ message: "Admin is logged in and verified.", user: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET A SPECIFIC USER BY ID
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("reviews");

        res.json(user)
    } catch (error) {
        console.log("Error fetching single user details", error);
    }
});

export default router;

    //we use jwt.sign() to creaqte a token upon login
    //to sign we need some info:
    // payload = info to encrypt/encode (user object in this example)
    // the SECRET in the .env file (could have any value, it's like a password)
    // algorithm = just use "HS256"
    // expiresIn = the amount of time in hours that your token will be valid for
