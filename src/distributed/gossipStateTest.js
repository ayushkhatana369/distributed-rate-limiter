const GossipStateCluster =
    require(
        "./gossipStateCluster"
    );

const cluster =
    new GossipStateCluster();

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

cluster.failNode(
    "NodeC"
);
cluster.gossip(
    "NodeC",
    "NodeA"
)
console.log(
    "\nBefore Gossip"
);

cluster.showView(
    "NodeA"
);

cluster.showView(
    "NodeB"
);

cluster.gossip(
    "NodeA",
    "NodeB"
);

console.log(
    "\nAfter Gossip"
);

cluster.showView(
    "NodeB"
);