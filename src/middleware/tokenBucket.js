const redisClient = require("../config/redis");

function createTokenBucketLimiter(
    capacity,
    refillSeconds
) {
    return async (req, res, next) => {
        try {

            const key =
                `token:${req.path}:${req.ip}`;

            const now =
                Math.floor(Date.now() / 1000);

            let bucket =
                await redisClient.hGetAll(key);

            // First request
            if (
                Object.keys(bucket).length === 0
            ) {

                await redisClient.hSet(key, {
                    tokens: capacity,
                    lastRefill: now
                });

                return next();
            }

            let tokens =
                Number(bucket.tokens);

            let lastRefill =
                Number(bucket.lastRefill);

            // Calculate how many tokens to refill
            const elapsedTime =
                now - lastRefill;

            const tokensToAdd =
                Math.floor(
                    elapsedTime / refillSeconds
                );

            // Refill bucket
            if (tokensToAdd > 0) {

                tokens = Math.min(
                    capacity,
                    tokens + tokensToAdd
                );

                lastRefill = now;
            }

            // No tokens left
            if (tokens <= 0) {

                return res.status(429).json({
                    success: false,
                    message: "Too many requests"
                });
            }

            // Consume one token
            tokens--;

            // Save updated bucket
            await redisClient.hSet(key, {
                tokens,
                lastRefill
            });

            next();

        } catch (error) {

            console.log(
                "Token Bucket Error:",
                error
            );

            next();
        }
    };
}

module.exports =
    createTokenBucketLimiter;