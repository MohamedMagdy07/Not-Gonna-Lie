import 'dotenv/config';
import express from 'express';
import './common/db/mongoose.js'
import {authRouter} from "./app/auth/auth.route.js";
import {globalErrorHandler} from "./common/error/error.js";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use(globalErrorHandler);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
})