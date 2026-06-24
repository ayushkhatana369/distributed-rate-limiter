class HintedHandoff {

    constructor() {

        this.hints =
            new Map();
    }

    storeHint(
        replicaIndex,
        key,
        value,
        ttl = null
    ) {

        if (
            !this.hints.has(
                replicaIndex
            )
        ) {

            this.hints.set(
                replicaIndex,
                []
            );
        }

        this.hints
            .get(replicaIndex)
            .push({
                key,
                value,
                ttl
            });

        console.log(
            `Hint stored for Replica ${
                replicaIndex + 1
            }`
        );
    }

    replay(
        replicaIndex,
        replica
    ) {

        const pending =
            this.hints.get(
                replicaIndex
            );

        if (!pending) {

            return;
        }

        for (
            const item
            of pending
        ) {

            replica.set(
                item.key,
                item.value,
                item.ttl
            );
        }

        console.log(
            `Hints replayed for Replica ${
                replicaIndex + 1
            }`
        );

        this.hints.delete(
            replicaIndex
        );
    }
}

module.exports =
    HintedHandoff;