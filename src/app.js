import express from 'express';
import './lib/db/mongoose.js'
import {authRouter} from "./app/auth/auth.route.js";
import cors from "cors"
import {globalErrorHandler} from "./lib/error/global.error.handler.js";
import {userRouter} from "./app/user/user.route.js";

export function createApp(){
    const app = express();
    app.use(cors({origin: 'http://localhost:4200'}));
    app.use(express.json());
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use(globalErrorHandler);


    return app;
}