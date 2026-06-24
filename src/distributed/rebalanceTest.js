const ShardManager =
    require("./shardManager");

const Rebalancer =
    require("./rebalance");

const cluster =
    new ShardManager();

cluster.addShard("Node1");
cluster.addShard("Node2");
cluster.addShard("Node3");

cluster.set(
    "user:1",
    "Ayush"
);

cluster.set(
    "user:2",
    "John"
);

cluster.set(
    "user:3",
    "David"
);

console.log(
    "\nBefore adding Node4"
);

console.log(
    cluster.get("user:1")
);

console.log(
    cluster.get("user:2")
);

console.log(
    cluster.get("user:3")
);

cluster.addShard(
    "Node4"
);

const moved =
    Rebalancer.rebalance(
        cluster
    );

console.log(
    "\nNode4 joined"
);

console.log(
    "Keys migrated:",
    moved.length
);

console.log(
    moved
);