const Master =
    require("./master");

const Replica =
    require("./replica");

const master =
    new Master();

const replica1 =
    new Replica();

const replica2 =
    new Replica();

master.addReplica(
    replica1
);

master.addReplica(
    replica2
);

master.set(
    "name",
    "Ayush"
);

master.set(
    "role",
    "Developer"
);

console.log(
    "MASTER",
    master.keys()
);

console.log(
    "REPLICA1",
    replica1.keys()
);

console.log(
    "REPLICA2",
    replica2.keys()
);