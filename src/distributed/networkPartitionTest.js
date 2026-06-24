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

console.log(
    "\n=== Partition Created ==="
);

// NodeC becomes isolated
cluster.failNode(
    "NodeC"
);

cluster.replicateLog(
    "NodeA",
    "SET city Delhi"
);

console.log(
    "\nRemaining Cluster"
);

cluster.showCluster();

console.log(
    "\n=== Partition Healed ==="
);

// NodeC comes back

const nodeC =
    cluster.nodes.find(
        n => n.id === "NodeC"
    );

nodeC.state =
    "Follower";

const leader =
    cluster.getLeader();

if (leader) {

    nodeC.log.entries = [
        ...leader.log.entries
    ];

    console.log(
        "NodeC synchronized"
    );
}
else {

    console.log(
        "No Leader found"
    );
}

cluster.showCluster();