import 'dotenv/config';
import express from 'express';
import './lib/db/mongoose.js'
import {authRouter} from "./app/auth/auth.route.js";
import {globalErrorHandler} from "./pkg/error/error.js";
import logger from "./pkg/logger/logger.js";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use(globalErrorHandler);

app.listen(process.env.APP_PORT, () => {
    logger.info(`Server started on port ${process.env.APP_PORT}`);
})