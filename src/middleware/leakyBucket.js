const redisClient = require("../config/redis");

function createLeakyBucketLimiter(
    capacity,
    leakRateSeconds
) {
    return async (req, res, next) => {

        try {

            const key =
                `leaky:${req.path}:${req.ip}`;

            const now =
                Math.floor(Date.now() / 1000);

            const bucket =
                await redisClient.hGetAll(key);

            // First request
            if (
                Object.keys(bucket).length === 0
            ) {

                await redisClient.hSet(key, {
                    queueSize: 1,
                    lastLeak: now
                });

                return next();
            }

            let queueSize =
                parseInt(bucket.queueSize);

            let lastLeak =
                parseInt(bucket.lastLeak);

            // Calculate leaked requests
            const elapsed =
                now - lastLeak;

            const leakedRequests =
                Math.floor(
                    elapsed / leakRateSeconds
                );

            queueSize =
                Math.max(
                    0,
                    queueSize - leakedRequests
                );

            // Bucket Full
            if (queueSize >= capacity) {

                return res.status(429).json({
                    success: false,
                    message: "Bucket Full"
                });
            }

            // Add current request
            queueSize++;

            // Update Redis
            await redisClient.hSet(key, {
                queueSize,
                lastLeak: now
            });

            await redisClient.expire(
                key,
                capacity * leakRateSeconds
            );

            next();

        } catch (error) {

            console.log(
                "Leaky Bucket Error:",
                error
            );

            next();
        }
    };
}

module.exports =
    createLeakyBucketLimiter;