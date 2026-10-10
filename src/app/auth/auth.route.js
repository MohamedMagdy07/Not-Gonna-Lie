import * as authController from "./controller/auth.controller.js"
import {Router} from "express";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.patch("/verify", authController.verify);
authRouter.patch("/reset-password", authController.resetPassword);
authRouter.post("/login", authController.login);
authRouter.post("/new-otp", authController.sendOtp);
authRouter.post("/login-with-google", authController.loginWithGoogle);