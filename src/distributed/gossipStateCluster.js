class GossipStateCluster {

    constructor() {

        this.views =
            new Map();
    }

    addNode(id) {

        const state = {
            alive: true,
            version: 0
        };

        this.views.set(
            id,
            new Map()
        );

        for (
            const view
            of this.views.values()
        ) {

            view.set(
                id,
                { ...state }
            );
        }

        this.views
            .get(id)
            .set(
                id,
                { ...state }
            );
    }

    heartbeat(id) {

        const selfView =
            this.views.get(id);

        selfView.get(id)
            .version++;
    }

    failNode(id) {

        const selfView =
            this.views.get(id);

        selfView.get(id)
            .alive = false;

        selfView.get(id)
            .version++;
    }

    gossip(
        fromId,
        toId
    ) {

        const fromView =
            this.views.get(fromId);

        const toView =
            this.views.get(toId);

        for (
            const [nodeId, state]
            of fromView
        ) {

            const existing =
                toView.get(nodeId);

            if (
                !existing ||
                state.version >
                existing.version
            ) {

                toView.set(
                    nodeId,
                    { ...state }
                );
            }
        }

        console.log(
            `${fromId} gossiped to ${toId}`
        );
    }

    showView(id) {

        console.log(
            `\nView of ${id}`
        );

        for (
            const [node, state]
            of this.views.get(id)
        ) {

            console.log(
                node,
                state
            );
        }
    }
}

module.exports =
    GossipStateCluster;