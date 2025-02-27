import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handlleValidationErrors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
        return
    }
    next();
}

export const validateAuthUser = [
    body('username').isString().notEmpty().withMessage("username must be string"),
    body('email').isEmail().notEmpty().withMessage("email must be string and in email format"),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
    handlleValidationErrors
]