const Store =
    require("../miniRedis/store");

const AntiEntropy =
    require("./antiEntropy");

const replica1 =
    new Store();

const replica2 =
    new Store();

replica1.set(
    "user",
    "Ayush"
);

replica1.set(
    "city",
    "Delhi"
);

replica2.set(
    "user",
    "Ayush"
);

replica2.set(
    "city",
    "Mumbai"
);

console.log(
    "\nBefore Repair"
);

console.log(
    "Replica1 city:",
    replica1.get("city")
);

console.log(
    "Replica2 city:",
    replica2.get("city")
);

AntiEntropy.repair(
    replica1,
    replica2
);

console.log(
    "\nAfter Repair"
);

console.log(
    "Replica2 city:",
    replica2.get("city")
);