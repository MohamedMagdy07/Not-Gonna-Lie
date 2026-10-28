import * as authController from "./controller/auth.controller.js"
import {Router} from "express";
import {idempotency} from "../../lib/idempotency/idempotency.js";
import {guard} from "../../lib/auth/guard.js";

export const authRouter = Router();

authRouter.post("/register", authController.register);

authRouter.patch("/verify", authController.verifyAccount);
authRouter.patch("/enable-2-step-verification",authController.enable2StepVerification);
authRouter.patch("/reset-password", idempotency(), authController.resetPassword);

authRouter.post("/login", authController.login);
authRouter.post("/new-otp", authController.sendOtp);
authRouter.post("/login-with-google", authController.loginWithGoogle);