const RaftCommitCluster =
    require(
        "./raftCommitCluster"
    );

const cluster =
    new RaftCommitCluster();

cluster.addNode(
    "NodeA"
);

cluster.addNode(
    "NodeB"
);

cluster.addNode(
    "NodeC"
);

cluster.electLeader(
    "NodeA"
);

cluster.replicateAndCommit(
    "SET city Delhi"
);

console.log(
    "\nLeader Store"
);

cluster.nodes[0]
    .stateMachine
    .show();

console.log(
    "\nFollower1 Store"
);

cluster.nodes[1]
    .stateMachine
    .show();

console.log(
    "\nFollower2 Store"
);

cluster.nodes[2]
    .stateMachine
    .show();

console.log(
    "\nRead city:"
);

console.log(
    cluster.nodes[1]
        .stateMachine
        .get("city")
);