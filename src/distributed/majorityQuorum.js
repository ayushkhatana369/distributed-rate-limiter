const Store =
    require("../miniRedis/store");

class MajorityQuorum {

    constructor() {

        this.replicas = [
            new Store(),
            new Store(),
            new Store()
        ];

        this.alive = [
            true,
            true,
            true
        ];
    }

    failReplica(index) {

        this.alive[index] =
            false;
    }

    recoverReplica(index) {

        this.alive[index] =
            true;
    }

    set(
        key,
        value,
        ttl = null
    ) {

        for (
            let i = 0;
            i < this.replicas.length;
            i++
        ) {

            if (
                !this.alive[i]
            ) {
                continue;
            }

            this.replicas[i].set(
                key,
                value,
                ttl
            );
        }

        return true;
    }

    get(key) {

        const votes =
            new Map();

        for (
            let i = 0;
            i < this.replicas.length;
            i++
        ) {

            if (
                !this.alive[i]
            ) {
                continue;
            }

            const value =
                this.replicas[i].get(key);

            votes.set(
                value,
                (votes.get(value) || 0) + 1
            );
        }

        let winner = null;
        let maxVotes = 0;

        for (
            const [value, count]
            of votes
        ) {

            if (
                count > maxVotes
            ) {

                maxVotes =
                    count;

                winner =
                    value;
            }
        }

        for (
            let i = 0;
            i < this.replicas.length;
            i++
        ) {

            if (
                !this.alive[i]
            ) {
                continue;
            }

            if (
                this.replicas[i].get(key)
                !== winner
            ) {

                this.replicas[i].set(
                    key,
                    winner
                );

                console.log(
                    `Replica ${i + 1} repaired`
                );
            }
        }

        return winner;
    }
}

module.exports =
    MajorityQuorum;