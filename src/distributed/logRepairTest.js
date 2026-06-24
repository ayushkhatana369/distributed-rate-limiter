const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

// Reset cluster state
for (const node of cluster.nodes) {

    node.term = 0;
    node.votedFor = null;
    node.state = "Follower";
    node.log.entries = [];
    node.commitIndex = 0;

    node.saveState();
}

cluster.startElection(
    "NodeA"
);

// Simulate NodeB falling behind
cluster.nodes[1].log.entries = [];

cluster.replicateLog(
    "NodeA",
    "SET city Delhi"
);

console.log(
    "\nLeader nextIndex:"
);

const leader =
    cluster.getLeader();

if (leader) {

    console.log(
        leader.nextIndex
    );
}
else {

    console.log(
        "Leader not found"
    );
}