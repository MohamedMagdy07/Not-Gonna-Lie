import http from "http";
import {createApp} from "./app.js";
import mongoose from "mongoose";
import {env} from "./lib/config/env.js";
import logger from "./pkg/logger/logger.js";
import express from "express";

const app = createApp();
const server = http.createServer(app);
server.listen(env.app_port, () => {
    logger.info(`Server started on port ${env.app_port}`);
});

async function shutdown() {
    logger.info(`Shutting down...`);
    server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);

process.on('SIGTERM', shutdown);