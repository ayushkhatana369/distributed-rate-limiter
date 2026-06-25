const {
    getCluster,
    getLimiter
} = require("../distributed/bootstrap");

const db =
    require("../miniRedis/database");

class DashboardService {

    getOverview() {

        const cluster =
            getCluster();

        const limiter =
            getLimiter();

        return {

            cluster: {

                leader:
                    cluster.getLeader()?.id,

               nodes:
    cluster.nodes.map(node => {

        console.log(node);

        return {

            id: node.id,

            state: node.state,

            term: node.term

        };

    })

            },

            metrics:

                limiter.getMetrics(),

            miniRedis: {

                keys:
                    db.keys().map(key => ({

                        key,

                        value:
                            db.get(key)

                    }))

            }

        };

    }

    crashNode(nodeId) {

        const cluster =
            getCluster();

        if (!cluster) {

            return {

                success: false,

                message:
                    "Cluster not initialized"

            };

        }

        cluster.failNode(
            nodeId
        );

        return {

            success: true,

            message:
                `${nodeId} crashed`

        };

    }
 recoverNode(nodeId) {

    const cluster =
        getCluster();

    cluster.recoverNode(
        nodeId
    );

    return {

        success: true,

        message:
            `${nodeId} recovered`

    };

}

}

module.exports =
    new DashboardService();