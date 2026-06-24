const Store = require("./store");

class RedisRateLimiter {

    constructor(limit, windowSeconds) {

        this.limit = limit;
        this.window = windowSeconds;

        this.redis = new Store();
    }

    allow(userId) {

        let count =
            this.redis.get(userId);

        if (!count) {

            this.redis.set(
                userId,
                1,
                this.window
            );

            return true;
        }

        count++;

        this.redis.set(
            userId,
            count,
            this.window
        );

        return count <= this.limit;
    }
}

module.exports =
    RedisRateLimiter;