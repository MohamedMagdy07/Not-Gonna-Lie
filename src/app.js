import express from 'express';
import './lib/db/mongoose.js'
import {authRouter} from "./app/auth/auth.route.js";
import cors from "cors"
import {globalErrorHandler} from "./lib/error/global.error.handler.js";
import {userRouter} from "./app/user/user.route.js";
import {correlationId} from "./lib/correlation/correlationId.js";
import {messageRouter} from "./app/message/message.route.js";
import cookieParser from "cookie-parser";

export function createApp(){
    const app = express();
    app.use(cors({origin: 'http://localhost:4200'}));
    app.use(express.json());
    app.use(cookieParser())
    app.use(correlationId)
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/message", messageRouter);
    app.use(globalErrorHandler);


    return app;
}