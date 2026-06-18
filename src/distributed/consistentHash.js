const crypto = require("crypto");

class ConsistentHashRing {
    constructor(virtualNodes = 200) {
        this.virtualNodes = virtualNodes;
        this.ring = new Map();
        this.sortedHashes = [];
    }

    getHash(key) {
        const hash = crypto
            .createHash("md5")
            .update(key)
            .digest("hex");

        return parseInt(hash.substring(0, 8), 16);
    }

    addNode(node) {
        for (let i = 0; i < this.virtualNodes; i++) {
            const virtualNode = `${node}-${i}`;

            const hash = this.getHash(virtualNode);

            this.ring.set(hash, node);
            this.sortedHashes.push(hash);
        }

        this.sortedHashes.sort((a, b) => a - b);
    }

    removeNode(node) {
        for (let i = 0; i < this.virtualNodes; i++) {
            const virtualNode = `${node}-${i}`;

            const hash = this.getHash(virtualNode);

            this.ring.delete(hash);

            this.sortedHashes =
                this.sortedHashes.filter(
                    h => h !== hash
                );
        }
    }

    getNode(key) {
        if (this.sortedHashes.length === 0) {
            return null;
        }

        const hash = this.getHash(key);

        let left = 0;
        let right = this.sortedHashes.length - 1;

        while (left <= right) {
            const mid =
                Math.floor((left + right) / 2);

            if (
                this.sortedHashes[mid] < hash
            ) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        const index =
            left % this.sortedHashes.length;

        return this.ring.get(
            this.sortedHashes[index]
        );
    }
}

module.exports = ConsistentHashRing;