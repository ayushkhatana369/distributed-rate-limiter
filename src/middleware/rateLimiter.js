const redisClient = require("../config/redis");

function createRateLimiter(maxRequests, windowSeconds) {
    return async (req, res, next) => {
        try {
            const key = `rate_limit:${req.path}:${req.ip}`;

            const requests = await redisClient.incr(key);

           
            if (requests === 1) {
                await redisClient.expire(key, windowSeconds);
            }
             const ttl = await redisClient.ttl(key);
            const remaining = Math.max(0, maxRequests - requests);
            res.set({
    "X-RateLimit-Limit": maxRequests,
    "X-RateLimit-Remaining": remaining,
    "X-RateLimit-Reset": ttl
});

            if (requests > maxRequests) {
                return res.status(429).json({
                    success: false,
                    message: "Too many requests"
                });
            }

            next();
        } catch (error) {
            console.log("Rate Limiter Error:", error);
            next();
        }
    };
}

module.exports = createRateLimiter;