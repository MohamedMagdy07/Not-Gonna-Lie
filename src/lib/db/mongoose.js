import mongoose from 'mongoose'
import logger from "../../pkg/logger/logger.js";
import {env} from "../config/env.js";

mongoose.connect(env.db.url).then(() => {
    logger.info("Database connected successfully")
}).catch((err) => {
    logger.error(`Could not connect to the database: ${err}`);
});