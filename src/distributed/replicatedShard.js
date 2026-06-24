const Store =
    require("../miniRedis/store");
const ReadRepair =
  require("./readRepair")

class ReplicatedShard {

    constructor() {

        this.primary =
            new Store();

        this.replica =
            new Store();
        this.primaryAlive= true;
    }

    set(
        key,
        value,
        ttl = null
    ) {

        this.primary.set(
            key,
            value,
            ttl
        );

        this.replica.set(
            key,
            value,
            ttl
        );
    }

   get(key) {

    if (
        !this.primaryAlive
    ) {

        return this.primary.get(
            key
        );
    }

    return ReadRepair.repair(
        this.primary,
        this.replica,
        key
    );
}

    del(key) {

        this.primary.del(key);

        this.replica.del(key);
    }
     failover() {

    console.log(
        "\nPrimary crashed"
    );

    this.primaryAlive =
        false;

    this.primary =
        this.replica;

    this.replica =
        new Store();

    console.log(
        "Replica promoted"
    );
}
       
}

module.exports =
    ReplicatedShard;