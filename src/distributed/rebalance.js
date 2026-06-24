class Rebalancer {

    static rebalance(cluster) {

        const moved = [];

        const allData = [];

        for (
            const [nodeId, store]
            of cluster.shards
        ) {

            for (
                const key
                of store.data.keys()
            ) {

                allData.push({
                    key,
                    value:
                        store.data.get(key)
                });
            }
        }

        for (
            const [nodeId, store]
            of cluster.shards
        ) {

            store.data.clear();
        }

        for (
            const item
            of allData
        ) {

            cluster.set(
                item.key,
                item.value
            );

            moved.push(
                item.key
            );
        }

        return moved;
    }
}

module.exports =
    Rebalancer;