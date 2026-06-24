const Store =
    require("../miniRedis/store");

const HintedHandoff =
    require("./hintedHandoff");

const handoff =
    new HintedHandoff();

const replicas = [

    new Store(),

    new Store(),

    new Store()
];

const replicaAlive = [
    true,
    false,
    true
];

for (
    let i = 0;
    i < replicas.length;
    i++
) {

    if (
        replicaAlive[i]
    ) {

        replicas[i].set(
            "user",
            "Ayush"
        );

    } else {

        handoff.storeHint(
            i,
            "user",
            "Ayush"
        );
    }
}

console.log(
    "\nReplica2 was down"
);

console.log(
    "Replica2:",
    replicas[1].get(
        "user"
    )
);

replicaAlive[1] =
    true;

handoff.replay(
    1,
    replicas[1]
);

console.log(
    "\nReplica2 recovered"
);

console.log(
    "Replica2:",
    replicas[1].get(
        "user"
    )
);