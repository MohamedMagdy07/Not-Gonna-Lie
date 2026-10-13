import http from "http";
import {createApp} from "./app.js";
import mongoose from "mongoose";
import {env} from "./lib/config/env.js";
import logger from "./pkg/logger/logger.js";

const server = http.createServer(createApp);
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

server.on('SIGINT', shutdown);

server.on('SIGTERM', shutdown);