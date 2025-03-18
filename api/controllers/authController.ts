import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user.model";
import { errorHandler } from "../utils/error";

export const SignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password } = req.body;


    if (!email || !password) {
        next(errorHandler(400, "Email and password are required"));
        // res.status(400).json({ message: "Email and password are required" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            next(errorHandler(400, "Email already exists"));
            // res.status(400).json({ message: "Email already exists" });
            return;
        }

        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            next(errorHandler(400, "Username already exists"));
            // res.status(400).json({ message: "Username already exists" });
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
            status: true,
            user: rest
        });
    } catch (error) {
        if (error instanceof Error) {
            next(errorHandler(500, error.message))
        } else {
            next(errorHandler(500, "An unknown error occurred"))
        }
    }
};
