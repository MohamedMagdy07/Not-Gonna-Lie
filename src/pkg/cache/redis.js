import Redis from "ioredis";

export class RedisCacheProvider {
    redis;

    constructor(config) {
        this.redis = new Redis({
            url: config.url,
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3,

        });
         this.redis.on("error", (err) => {console.error(`redis server error: ${err.message}`)});
        this.redis.connect().catch((err) => {console.error(`failed to connect to redis cache , ${err.message}`)});
    }

    async set(key, value,ttl) {
        return await this.redis.set(key, value,"EX",ttl);
    }

    async get(key) {
        return await this.redis.get(key);
    }

    async delete(key) {
        return await this.redis.delete(key);
    }
}