import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user.model";

export const SignUp = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;


    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });


        await newUser.save();


        const { password: pass, ...rest } = newUser.toObject();


        res.status(201).json({
            message: "User created successfully",
            user: rest
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create user" });
    }
};
