const RaftCluster =
    require("./raftCluster");

const DistributedLimiter =
    require("./rateLimiter/distributedLimiter");

const {
    setLimiter,
    getLimiter
} = require(
    "./rateLimiter/limiterInstance"
);

let cluster = null;


function initialize() {

    if (cluster) {

        return cluster;
    }

    cluster =
        new RaftCluster();

    cluster.startElection(
        "NodeA"
    );
    for (const node of cluster.nodes) {

    if (node.state === "Follower") {

        node.startElectionTimer();

    }

}

   const  limiter =
        new DistributedLimiter(

            cluster,

            "NodeA",

            "SLIDING_WINDOW",

            {

                limit: 5,

                windowSize: 10

            }

        );

    setLimiter(
        limiter
    );

    return cluster;
}
function getCluster(){
    return cluster;
}

module.exports = {

    initialize,
    getCluster,
    getLimiter


};