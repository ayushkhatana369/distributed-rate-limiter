class TokenBucket {

    constructor(
        capacity,
        refillRate
    ) {

        this.capacity =
            capacity;

        this.tokens =
            capacity;

        this.refillRate =
            refillRate;

        this.lastRefill =
            Date.now();
    }

    refill() {

        const now =
            Date.now();

        const seconds =

            (now - this.lastRefill)

            / 1000;

        const refillTokens =

            seconds *

            this.refillRate;

        this.tokens =

            Math.min(

                this.capacity,

                this.tokens +

                refillTokens

            );

        this.lastRefill =
            now;
    }

    allowRequest() {

        this.refill();

        if (
            this.tokens >= 1
        ) {

            this.tokens--;

            return true;
        }

        return false;
    }

    getInfo() {

        return {

            capacity:
                this.capacity,

            tokens:
                this.tokens,

            refillRate:
                this.refillRate

        };
    }
}

module.exports =
    TokenBucket;