const VectorClock =
    require("./vectorClock");

const ConflictResolver =
    require("./conflictResolver");

const clockA =
    new VectorClock();

clockA.increment(
    "NodeA"
);

clockA.increment(
    "NodeA"
);

const clockB =
    new VectorClock();

clockB.increment(
    "NodeB"
);

const versionA = {
    value: "AyushKhatana",
    clock: clockA.getClock()
};

const versionB = {
    value: "AyushGurjar",
    clock: clockB.getClock()
};

const compare =
    clockA.compare(
        clockB.getClock()
    );

const result =
    ConflictResolver.resolve(
        versionA,
        versionB,
        compare
    );

console.log(
    "Compare:",
    compare
);

console.log(
    "\nResolved Result:"
);

console.log(result);