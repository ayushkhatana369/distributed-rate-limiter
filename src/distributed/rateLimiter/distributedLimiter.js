const LimiterStore =
    require("./limiterStore");

class DistributedLimiter {

    constructor(
        cluster,
        leaderId,
        algorithm,
        config
    ) {

        this.cluster =
            cluster;

        this.leaderId =
            leaderId;

        this.store =
            new LimiterStore(

                algorithm,

                config

            );
        this.algorithm = algorithm
        this.totalRequests = 0;
        this.allowedRequests = 0;
        this.blockedRequests = 0;
    }

    allowRequest(
        clientId
    ) {
        this.totalRequests++;
        const allowed =

            this.store.allowRequest(
                clientId
            );

        if (!allowed) {
            this.blockedRequests++;
            console.log(

                `${clientId} rate limited`

            );

            return false;
        }

        this.cluster.replicateLog(

            this.leaderId,

            `ALLOW ${clientId}`

        );

        console.log(

            `${clientId} request allowed`

        );
        this.allowRequests++;

        return true;
    }

    showBuckets() {

        this.store.showStore();
    }
  
    getMetrics() {

    return {

        algorithm:
            this.algorithm,

        totalRequests:
            this.totalRequests,

        allowedRequests:
            this.allowedRequests,

        blockedRequests:
            this.blockedRequests,

        ...this.store.getMetrics()

    };
}
}

module.exports =
    DistributedLimiter;