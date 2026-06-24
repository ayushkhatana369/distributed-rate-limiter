const Store =
    require("../miniRedis/store");

const HintedHandoff =
    require("./hintedHandoff");

class QuorumStore {

    constructor() {

        this.replicas = [

            new Store(),

            new Store(),

            new Store()
        ];

        this.replicaAlive = [

            true,
            true,
            true
        ];

        this.readQuorum = 2;

        this.writeQuorum = 2;

        this.handoff =
            new HintedHandoff();
    }

    failReplica(index) {

        this.replicaAlive[index] =
            false;
    }

    recoverReplica(index) {

        this.replicaAlive[index] =
            true;

        this.handoff.replay(
            index,
            this.replicas[index]
        );
    }

    set(
        key,
        value,
        ttl = null
    ) {

        let acknowledgements =
            0;

        for (
            let i = 0;
            i < this.replicas.length;
            i++
        ) {

            if (
                this.replicaAlive[i]
            ) {

                this.replicas[i].set(
                    key,
                    value,
                    ttl
                );

                acknowledgements++;

            } else {

                this.handoff.storeHint(
                    i,
                    key,
                    value,
                    ttl
                );
            }
        }

        return (
            acknowledgements >=
            this.writeQuorum
        );
    }

    get(key) {

        const votes =
            new Map();

        let reads = 0;

        for (
            let i = 0;
            i < this.replicas.length;
            i++
        ) {

            if (
                !this.replicaAlive[i]
            ) {

                continue;
            }

            const value =
                this.replicas[i].get(
                    key
                );

            reads++;

            votes.set(
                value,
                (votes.get(value) || 0)
                + 1
            );

            if (
                reads >=
                this.readQuorum
            ) {

                break;
            }
        }

        let winner =
            null;

        let maxVotes =
            0;

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

        return winner;
    }
}

module.exports =
    QuorumStore;