const RedisRateLimiter =
    require("./redisRateLimiter");

const limiter =
    new RedisRateLimiter(
        5,
        10
    );

for (let i = 1; i <= 8; i++) {

    console.log(
        `Request ${i}:`,
        limiter.allow(
            "Ayush"
        )
    );
}