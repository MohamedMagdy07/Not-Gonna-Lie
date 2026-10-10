import pino from 'pino'; //will just use this package as logger

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {colorize: true}
    }
});

export default logger;