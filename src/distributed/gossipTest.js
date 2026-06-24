const GossipCluster =
    require("./gossipCluster");

const cluster =
    new GossipCluster();

cluster.addNode(
    "NodeA"
);

cluster.addNode(
    "NodeB"
);

cluster.addNode(
    "NodeC"
);

cluster.heartbeat(
    "NodeA"
);

cluster.heartbeat(
    "NodeA"
);

cluster.heartbeat(
    "NodeB"
);

cluster.showCluster();

console.log(
    "\nGossip Round"
);

cluster.gossip(
    "NodeA",
    "NodeB"
);

cluster.gossip(
    "NodeB",
    "NodeC"
);

console.log(
    "\nNodeC Fails"
);

cluster.failNode(
    "NodeC"
);

cluster.showCluster();