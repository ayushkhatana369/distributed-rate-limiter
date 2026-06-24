const DistributedRateLimiter =
    require(
        "./distributedRateLimiter"
    );

const limiter =
    new DistributedRateLimiter(
        5,
        10000
    );

for (
    let i = 1;
    i <= 8;
    i++
) {

    console.log(
        `Ayush Request ${i}:`,
        limiter.isAllowed(
            "Ayush"
        )
    );
}