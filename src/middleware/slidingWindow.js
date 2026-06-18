const redisClient = require("../config/redis");

function createSlidingWindowLimiter(maxRequests, windowSeconds) {

    return async (req, res, next) => {
        try {

            const key = `sliding:${req.path}:${req.ip}`;

            const now = Date.now();

            const windowStart =
                now - (windowSeconds * 1000);

            // Remove old requests
            await redisClient.zRemRangeByScore(
                key,
                0,
                windowStart
            );

            // Count requests in current window
            const requests =
                await redisClient.zCard(key);

            // Block if limit reached
            if (requests >= maxRequests) {

                return res.status(429).json({
                    success: false,
                    message: "Too many requests"
                });

            }

            // Store current request timestamp
            await redisClient.zAdd(key, [
                {
                    score: now,
                    value: now.toString()
                }
            ]);

            // Auto cleanup
            await redisClient.expire(
                key,
                windowSeconds
            );

            next();

        } catch (error) {

            console.log(
                "Sliding Window Error:",
                error
            );

            next();
        }
    };
}

module.exports = createSlidingWindowLimiter;