const ShardManager =
    require("./shardManager");

class DistributedRateLimiter {

    constructor(
        limit,
        windowMs
    ) {

        this.limit =
            limit;

        this.windowMs =
            windowMs;

        this.shards =
            new ShardManager();

        this.shards.addShard(
            "Shard1"
        );

        this.shards.addShard(
            "Shard2"
        );

        this.shards.addShard(
            "Shard3"
        );
    }

    isAllowed(userId) {

        let requests =
            this.shards.get(
                userId
            );

        if (!requests) {

            requests = {
                count: 0,
                start: Date.now()
            };
        }

        const now =
            Date.now();

        if (
            now -
            requests.start >
            this.windowMs
        ) {

            requests = {
                count: 0,
                start: now
            };
        }

        requests.count++;

        this.shards.set(
            userId,
            requests
        );

        return (
            requests.count <=
            this.limit
        );
    }
}

module.exports =
    DistributedRateLimiter;