import { Router } from "express";
import * as authController from "../controller/auth.controller";
import {
    loginValidation,
    registerValidation,
} from "../validations/auth.validation";
// import isAuthenticated from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", registerValidation, authController.register);
authRoutes.post("/login", loginValidation, authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.get("/profile", authController.getProfile);

export default authRoutes;
