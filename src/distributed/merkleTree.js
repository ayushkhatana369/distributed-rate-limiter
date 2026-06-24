const crypto =
    require("crypto");

class MerkleTree {

    static hash(data) {

        return crypto
            .createHash("sha256")
            .update(
                String(data)
            )
            .digest("hex");
    }

    static build(store) {

        const hashes = [];

        const keys =
            Array.from(
                store.data.keys()
            ).sort();

        for (
            const key
            of keys
        ) {

            const value =
                store.get(key);

            hashes.push(
                this.hash(
                    key + ":" + value
                )
            );
        }

        if (
            hashes.length === 0
        ) {

            return null;
        }

        while (
            hashes.length > 1
        ) {

            const next = [];

            for (
                let i = 0;
                i < hashes.length;
                i += 2
            ) {

                const left =
                    hashes[i];

                const right =
                    hashes[i + 1]
                    || left;

                next.push(
                    this.hash(
                        left + right
                    )
                );
            }

            hashes.splice(
                0,
                hashes.length,
                ...next
            );
        }

        return hashes[0];
    }
}

module.exports =
    MerkleTree;