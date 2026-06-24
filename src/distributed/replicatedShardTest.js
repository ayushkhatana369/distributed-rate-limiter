const ReplicatedShard =
    require("./replicatedShard");

const shard =
    new ReplicatedShard();

shard.set(
    "name",
    "Ayush"
);

console.log(
    "Before failover:",
    shard.get("name")
);

shard.failover();

console.log(
    "After failover:",
    shard.get("name")
);