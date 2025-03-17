import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
        return;
    }
    next();
};

export const validateAuthUser = [
    body('username').isString().notEmpty().withMessage("Username must be a non-empty string"),
    body('email').isEmail().withMessage("Email must be a valid email address").notEmpty().withMessage("Email is required"),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
    handleValidationErrors
];