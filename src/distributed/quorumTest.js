const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

console.log(
    "\n=== Initial Cluster ==="
);

cluster.showCluster();

console.log(
    "\n=== Crash NodeB ==="
);

cluster.failNode(
    "NodeB"
);

console.log(
    "\n=== Crash NodeC ==="
);

cluster.failNode(
    "NodeC"
);

console.log(
    "\n=== NodeA Tries Election ==="
);

cluster.startElectionAfterFailure(
    "NodeA"
);

console.log(
    "\n=== Final Cluster ==="
);

cluster.showCluster();