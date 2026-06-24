const MajorityQuorum =
    require("./majorityQuorum");

const cluster =
    new MajorityQuorum();

cluster.set(
    "user",
    "Ayush"
);

console.log(
    "Initial:",
    cluster.get("user")
);

cluster.replicas[2].set(
    "user",
    "WrongData"
);

console.log(
    "\nReplica3 corrupted"
);

console.log(
    "Replica1:",
    cluster.replicas[0].get("user")
);

console.log(
    "Replica2:",
    cluster.replicas[1].get("user")
);

console.log(
    "Replica3:",
    cluster.replicas[2].get("user")
);

console.log(
    "\nMajority Read:"
);

console.log(
    cluster.get("user")
);

console.log(
    "\nAfter Repair:"
);

console.log(
    "Replica3:",
    cluster.replicas[2].get("user")
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
    cluster.get("city")
);