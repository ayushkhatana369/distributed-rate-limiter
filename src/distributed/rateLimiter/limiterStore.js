const RateLimiterFactory =
    require("./rateLimiterFactory");

class LimiterStore {

    constructor(
        algorithm,
        config
    ) {

        this.algorithm =
            algorithm;

        this.config =
            config;

        this.buckets =
            new Map();
    }

    getBucket(
        clientId
    ) {

        if (
            !this.buckets.has(
                clientId
            )
        ) {

            this.buckets.set(

                clientId,

                RateLimiterFactory.create(

                    this.algorithm,

                    this.config

                )
            );
        }

        return this.buckets.get(
            clientId
        );
    }

    allowRequest(
        clientId
    ) {

        const bucket =

            this.getBucket(
                clientId
            );

        return bucket.allowRequest();
    }

    showStore() {

        for (

            const [id, bucket]

            of this.buckets

        ) {

            console.log(

                id,

                bucket.getInfo()

            );
        }
    }
    getMetrics() {

    return {

        activeUsers:
            this.buckets.size

    };
}
}

module.exports =
    LimiterStore;