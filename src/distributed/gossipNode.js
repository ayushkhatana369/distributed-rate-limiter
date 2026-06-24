class GossipNode {

    constructor(id) {

        this.id = id;

        this.alive = true;

        this.version = 0;
    }

    heartbeat() {

        this.version++;
    }

    fail() {

        this.alive = false;
    }

    recover() {

        this.alive = true;
    }

    getState() {

        return {

            id: this.id,

            alive: this.alive,

            version: this.version
        };
    }
}

module.exports =
    GossipNode;