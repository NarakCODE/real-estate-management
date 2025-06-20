import { type Request, type Response } from "express";
import * as authService from "../services/auth.service";
import { HTTPSTATUS } from "../config/http-status.config";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(HTTPSTATUS.CREATED).json({
            message: "User registered successfully",
            user,
        });
    } catch (error: any) {
        res.status(HTTPSTATUS.BAD_REQUEST).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await authService.loginUser(req.body);

        (req.session as any).user = user;

        res.status(HTTPSTATUS.OK).json({ message: "Login successful", user });
    } catch (error: any) {
        res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: error.message });
    }
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res
                .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
                .json({ message: "Could not log out." });
        }
        res.clearCookie("connect.sid"); // default cookie name
        res.status(HTTPSTATUS.OK).json({ message: "Logout successful" });
    });
};

export const getProfile = (req: Request, res: Response) => {
    const session = req.session as any;
    if (session?.user) {
        res.status(HTTPSTATUS.OK).json({ user: session.user });
    } else {
        res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: "Not authenticated",
        });
    }
};
