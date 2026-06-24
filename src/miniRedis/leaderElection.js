class LeaderElection {

    constructor(replicas) {

        this.replicas =
            replicas;

        this.master =
            null;
    }

    electLeader() {

        if (
            this.replicas.length === 0
        ) {
            return null;
        }

        this.master =
            this.replicas[0];

        return this.master;
    }

    getMaster() {

        return this.master;
    }
}

module.exports =
    LeaderElection;