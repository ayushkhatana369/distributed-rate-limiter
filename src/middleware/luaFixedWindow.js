const redisClient = require("../config/redis");

function createLuaFixedWindowLimiter(
    maxRequests,
    windowSeconds
) {

    return async (req, res, next) => {

        try {

            const key =
                `lua_fixed:${req.path}:${req.ip}`;

            const requests =
                await redisClient.eval(

                    `
                    local current =
                        redis.call(
                            "INCR",
                            KEYS[1]
                        )

                    if current == 1 then

                        redis.call(
                            "EXPIRE",
                            KEYS[1],
                            ARGV[1]
                        )

                    end

                    return current
                    `,

                    {
                        keys: [key],
                        arguments: [
                            windowSeconds.toString()
                        ]
                    }

                );

            if (
                requests > maxRequests
            ) {

                return res.status(429).json({
                    success: false,
                    message:
                        "Too many requests"
                });

            }

            next();

        } catch (error) {

            console.log(
                "Lua Fixed Window Error:",
                error
            );

            next();
        }

    };
}

module.exports =
    createLuaFixedWindowLimiter;