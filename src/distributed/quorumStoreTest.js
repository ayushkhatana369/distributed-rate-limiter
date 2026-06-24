const QuorumStore =
    require("./quorumStore");

const cluster =
    new QuorumStore();

console.log(
    "\nNormal Write:"
);

console.log(
    cluster.set(
        "user",
        "Ayush"
    )
);

console.log(
    cluster.get(
        "user"
    )
);

console.log(
    "\nFailing Replica2"
);

cluster.failReplica(1);

cluster.set(
    "city",
    "Delhi"
);

console.log(
    "Read city:",
    cluster.get(
        "city"
    )
);

console.log(
    "\nRecovering Replica2"
);

cluster.recoverReplica(1);

console.log(
    "Replica2 city:",
    cluster.replicas[1].get(
        "city"
    )
);