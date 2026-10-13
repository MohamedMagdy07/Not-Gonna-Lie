import express from 'express';
import './lib/db/mongoose.js'
import {authRouter} from "./app/auth/auth.route.js";
import logger from "./pkg/logger/logger.js";
import {env} from "./lib/config/env.js";
import cors from "cors"
import {globalErrorHandler} from "./pkg/error/globalErrorHandler.js";

export function createApp(){
    const app = express();
    app.use(cors({origin: 'http://localhost:4200'}));
    app.use(express.json());
    app.use("/auth", authRouter);
    app.use(globalErrorHandler);


    return app;
}