const VectorClock =
    require("./vectorClock");

const clockA =
    new VectorClock();

const clockB =
    new VectorClock();

clockA.increment(
    "NodeA"
);

clockA.increment(
    "NodeA"
);

clockB.increment(
    "NodeB"
);

console.log(
    "Clock A:",
    clockA.getClock()
);

console.log(
    "Clock B:",
    clockB.getClock()
);

const result =
    clockA.compare(
        clockB.getClock()
    );

console.log(
    "\nCompare:",
    result
);

if (
    result === null
) {

    console.log(
        "Conflict detected"
    );
}