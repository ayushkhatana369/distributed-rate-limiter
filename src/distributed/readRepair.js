class ReadRepair {

    static repair(
        primary,
        replica,
        key
    ) {

        const primaryValue =
            primary.get(key);

        const replicaValue =
            replica.get(key);

        if (
            primaryValue !== replicaValue
        ) {

            replica.set(
                key,
                primaryValue
            );

            console.log(
                "Repaired:",
                key
            );
        }

        return primaryValue;
    }
}

module.exports =
    ReadRepair;