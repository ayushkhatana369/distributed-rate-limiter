const TokenBucket =
    require("./tokenBucket");

const FixedWindow =
  require("./fixedWindow");
const SlidingWindow = 
require("./slidingWindow")
class RateLimiterFactory {

    static create(
        algorithm,
        config
    ) {

        switch (
            algorithm
        ) {

            case "TOKEN_BUCKET":

                return new TokenBucket(

                    config.capacity,

                    config.refillRate

                );
                 case "FIXED_WINDOW":

                return new FixedWindow(

                    config.limit,

                    config.windowSize

                );
                    case "SLIDING_WINDOW":

                return new SlidingWindow(

                    config.limit,

                    config.windowSize

                )

            default:

                throw new Error(

                    `Unknown algorithm: ${algorithm}`

                );
        }
    }
}

module.exports =
    RateLimiterFactory;