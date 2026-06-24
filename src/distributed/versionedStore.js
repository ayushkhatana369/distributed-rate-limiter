const VectorClock =
    require("./vectorClock");

class VersionedStore {

    constructor() {

        this.data =
            new Map();
    }

    put(
        key,
        value,
        nodeId
    ) {

        let version =
            this.data.get(key);

        if (!version) {

            version = {
                value: null,
                clock:
                    new VectorClock()
            };
        }

        version.clock.increment(
            nodeId
        );

        version.value =
            value;

        this.data.set(
            key,
            version
        );
    }

    get(key) {

        return this.data.get(
            key
        );
    }

    keys() {

        return [
            ...this.data.keys()
        ];
    }
}

module.exports =
    VersionedStore;