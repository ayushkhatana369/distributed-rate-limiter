const persistence =
    require("./persistence");

const recover =
    require("./recovery");
const startExpiryWorker = 
     require ("./expiryWorker");    
const startSnapshotWorker = require("./snapshotWorker");
const loadSnapshot =
require("./loadSnapshot")
class Store {

    constructor() {

        this.data =
            new Map();

        this.expiry =
            new Map();
        loadSnapshot(this);

        recover(this);
     startExpiryWorker(this); 
     
     startSnapshotWorker(this);

    }

    set(
        key,
        value,
        ttl = null
    ) {

        this.data.set(
            key,
            value
        );

        if (ttl) {

            const expireAt =
                Date.now() +
                ttl * 1000;

            this.expiry.set(
                key,
                expireAt
            );

        }

        persistence.append(
            `SET ${key} ${value}`
        );

    }

    isExpired(key) {

        if (
            !this.expiry.has(key)
        ) {
            return false;
        }

        return (
            Date.now() >
            this.expiry.get(key)
        );

    }

    get(key) {

        if (
            this.isExpired(key)
        ) {

            this.del(key);

            return null;

        }

        return this.data.get(
            key
        );

    }

    del(key) {

        persistence.append(
            `DEL ${key}`
        );

        this.expiry.delete(
            key
        );

        return this.data.delete(
            key
        );

    }

    exists(key) {

        if (
            this.isExpired(key)
        ) {

            this.del(key);

            return false;

        }

        return this.data.has(
            key
        );

    }

    keys() {

        const result = [];

        for (
            const key of this.data.keys()
        ) {

            if (
                this.isExpired(key)
            ) {

                this.del(key);

                continue;

            }

            result.push(key);

        }

        return result;

   
    }


    getAll() {

    const result = {};

    for (const key of this.keys()) {

        result[key] = this.get(key);

    }

    return result;

}
}


module.exports =
    Store;