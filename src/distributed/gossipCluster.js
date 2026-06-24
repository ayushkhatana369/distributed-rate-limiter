const GossipNode =
    require("./gossipNode");

class GossipCluster {

    constructor() {

        this.nodes =
            new Map();
    }

    addNode(id) {

        this.nodes.set(
            id,
            new GossipNode(id)
        );
    }

    heartbeat(id) {

        this.nodes
            .get(id)
            .heartbeat();
    }

    failNode(id) {

        this.nodes
            .get(id)
            .fail();
    }

    recoverNode(id) {

        this.nodes
            .get(id)
            .recover();
    }

    gossip(fromId, toId) {

        const from =
            this.nodes
                .get(fromId);

        const to =
            this.nodes
                .get(toId);

        const state =
            from.getState();

        console.log(
            `${fromId} -> ${toId}`,
            state
        );

        return state;
    }

    showCluster() {

        console.log(
            "\nCluster State"
        );

        for (
            const node
            of this.nodes.values()
        ) {

            console.log(
                node.getState()
            );
        }
    }
}

module.exports =
    GossipCluster;