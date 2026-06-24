const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

cluster.startElection(
    "NodeA"
);

console.log(
    "\nInitial Cluster"
);

cluster.showCluster();

console.log(
    "\nLeader Crashes"
);

cluster.failNode(
    "NodeA"
);

cluster.showCluster();

console.log(
    "\nNodeB Starts Election"
);

cluster.startElectionAfterFailure(
    "NodeB"
);

console.log(
    "\nAfter Re-Election"
);

cluster.showCluster();