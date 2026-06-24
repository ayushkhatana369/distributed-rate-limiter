class LoadBalancer {

    constructor(replicas) {

        this.replicas =
            replicas;

        this.index = 0;

    }

    getReplica() {

        const replica =
            this.replicas[
                this.index
            ];

        this.index =
            (this.index + 1)
            %
            this.replicas.length;

        return replica;

    }

}

module.exports =
    LoadBalancer;