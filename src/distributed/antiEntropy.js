const MerkleTree =
    require("./merkleTree");

class AntiEntropy {

    static repair(
        source,
        target
    ) {

        const sourceHash =
            MerkleTree.build(
                source
            );

        const targetHash =
            MerkleTree.build(
                target
            );

        console.log(
            "Source Hash:",
            sourceHash
        );

        console.log(
            "Target Hash:",
            targetHash
        );

        if (
            sourceHash ===
            targetHash
        ) {

            console.log(
                "Already synchronized"
            );

            return;
        }

        console.log(
            "\nRepairing..."
        );

        for (
            const key
            of source.data.keys()
        ) {

            const sourceValue =
                source.get(key);

            const targetValue =
                target.get(key);

            if (
                sourceValue !==
                targetValue
            ) {

                target.set(
                    key,
                    sourceValue
                );

                console.log(
                    `Repaired ${key}`
                );
            }
        }
    }
}

module.exports =
    AntiEntropy;