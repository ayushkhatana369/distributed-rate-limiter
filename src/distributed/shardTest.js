const ShardManager =
    require("./shardManager");

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
    cluster.get("user:1")
);

console.log(
    cluster.get("user:2")
);

console.log(
    cluster.get("user:3")
);