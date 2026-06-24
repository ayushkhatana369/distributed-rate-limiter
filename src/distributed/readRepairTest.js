const ReplicatedShard =
    require("./replicatedShard");

const shard =
    new ReplicatedShard();

shard.set(
    "user",
    "Ayush"
);

console.log(
    "Before corruption:"
);

console.log(
    "Primary:",
    shard.primary.get("user")
);

console.log(
    "Replica:",
    shard.replica.get("user")
);

shard.replica.set(
    "user",
    "WrongData"
);

console.log(
    "\nReplica corrupted"
);

console.log(
    "Replica:",
    shard.replica.get("user")
);

console.log(
    "\nReading key..."
);

console.log(
    shard.get("user")
);

console.log(
    "\nAfter repair:"
);

console.log(
    "Replica:",
    shard.replica.get("user")
);