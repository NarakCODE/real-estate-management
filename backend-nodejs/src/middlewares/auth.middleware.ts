import { type Request, type Response, type NextFunction } from "express";
import { HTTPSTATUS } from "../config/http-status.config";

const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Using type assertion to avoid TypeScript errors with session
    const session = req.session as any;
    if (session?.user) {
        return next();
    }

    res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "Not authenticated" });
};

export default isAuthenticated;
