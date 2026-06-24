const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

cluster.showCluster();

console.log(
    "\nElection Begins"
);

cluster.startElection(
    "NodeA"
);

cluster.showCluster();