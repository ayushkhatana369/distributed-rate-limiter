const Store = require("./store");

class Master extends Store {

    constructor() {

        super();

        this.replicas = [];

    }

    addReplica(replica) {

        this.replicas.push(
            replica
        );

    }

    set(key, value, ttl = null) {

        super.set(
            key,
            value,
            ttl
        );

        for (
            const replica
            of this.replicas
        ) {

            replica.replicateSet(
                key,
                value,
                ttl
            );

        }

    }

    del(key) {

        super.del(key);

        for (
            const replica
            of this.replicas
        ) {

            replica.replicateDel(
                key
            );

        }

    }

}

module.exports =
    Master;