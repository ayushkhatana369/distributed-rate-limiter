const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

cluster.startElection(
    "NodeA"
);

console.log(
    "\nBefore Heartbeat"
);

cluster.showCluster();

const leader =
    cluster.getLeader();

leader.sendHeartbeat(
    cluster
);

console.log(
    "\nAfter Heartbeat"
);

cluster.showCluster();