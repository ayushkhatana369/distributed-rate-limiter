const Store =
    require("./store");

class Replica extends Store {

    constructor(name) {

        super();

        this.name = name;
    }

    replicateSet(
        key,
        value,
        ttl
    ) {
        super.set(
            key,
            value,
            ttl
        );
    }

    replicateDel(
        key
    ) {
        super.del(
            key
        );
    }
}

module.exports =
    Replica;