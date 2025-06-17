import { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import { HTTPSTATUS } from "../config/http-status.config";

// Define Zod schemas for validation
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});

export const registerValidation = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        } else {
            res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Invalid input data",
            });
        }
    }
};

export const loginValidation = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }
        res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid input data",
        });
    }
};
