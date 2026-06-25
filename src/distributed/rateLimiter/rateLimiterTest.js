const RaftCluster =
    require("../raftCluster");

const DistributedLimiter =
    require("./distributedLimiter");

const cluster =
    new RaftCluster();

// Reset cluster
for (const node of cluster.nodes) {

    node.term = 0;
    node.votedFor = null;
    node.state = "Follower";
    node.log.entries = [];
    node.commitIndex = 0;

    node.saveState();
}

// Elect leader
cluster.startElection(
    "NodeA"
);

const limiter =
    new DistributedLimiter(

        cluster,

        "NodeA",
        "SLIDING_WINDOW",{
            limit : 5,
            windowSize:10
        }


    );

console.log(
    "\n===== Requests =====\n"
);

for (
    let i = 1;
    i <= 7;
    i++
) {

    console.log(
        `Request ${i}`
    );

    limiter.allowRequest(
        "Ayush"
    );
}

console.log(
    "\n===== Bucket =====\n"
);

limiter.showBuckets();

console.log(
    "\n===== Cluster =====\n"
);

cluster.showCluster();