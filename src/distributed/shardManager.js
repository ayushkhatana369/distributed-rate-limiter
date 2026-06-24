const Store =
    require("../miniRedis/store");

const ConsistentHashRing =
    require("./consistentHash");

class ShardManager {

    constructor() {

        this.ring =
            new ConsistentHashRing(200);

        this.shards =
            new Map();
    }

    addShard(nodeId) {

        this.ring.addNode(nodeId);

        this.shards.set(
            nodeId,
            new Store()
        );
    }

    getShard(key) {

        const nodeId =
            this.ring.getNode(key);

        return this.shards.get(
            nodeId
        );
    }

    set(key, value, ttl = null) {

        const shard =
            this.getShard(key);

        shard.set(
            key,
            value,
            ttl
        );
    }

    get(key) {

        const shard =
            this.getShard(key);

        return shard.get(key);
    }

    del(key) {

        const shard =
            this.getShard(key);

        return shard.del(key);
    }

    exists(key) {

        const shard =
            this.getShard(key);

        return shard.exists(key);
    }
}

module.exports =
    ShardManager;