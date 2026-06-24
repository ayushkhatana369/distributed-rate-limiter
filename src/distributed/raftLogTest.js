const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

cluster.startElection(
    "NodeA"
);

console.log(
    "\nReplicating Log"
);

cluster.replicateLog(
    "NodeA",
    "SET city Delhi"
);

console.log(
    "\nLeader Log"
);

console.log(
    cluster.nodes[0]
        .log
        .getEntries()
);

console.log(
    "\nFollower1 Log"
);

console.log(
    cluster.nodes[1]
        .log
        .getEntries()
);

console.log(
    "\nFollower2 Log"
);

console.log(
    cluster.nodes[2]
        .log
        .getEntries()
);