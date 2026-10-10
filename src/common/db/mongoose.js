import 'dotenv/config';
import mongoose from 'mongoose'
import logger from "../logger/logger.js";

mongoose.connect(process.env.MONGODB_URI).then(() => {
    logger.info("Database connected successfully")
}).catch((err) => {
    logger.error(`Could not connect to the database: ${err}`);
});