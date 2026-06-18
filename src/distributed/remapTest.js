const ConsistentHashRing =
    require("./consistentHash");

const beforeRing =
    new ConsistentHashRing(200);

beforeRing.addNode("ServerA");
beforeRing.addNode("ServerB");
beforeRing.addNode("ServerC");

const before = {};

for (let i = 1; i <= 10000; i++) {
    before[`User${i}`] =
        beforeRing.getNode(`User${i}`);
}

const afterRing =
    new ConsistentHashRing(200);

afterRing.addNode("ServerA");
afterRing.addNode("ServerB");
afterRing.addNode("ServerC");
afterRing.addNode("ServerD");

let moved = 0;

for (let i = 1; i <= 10000; i++) {

    const oldServer =
        before[`User${i}`];

    const newServer =
        afterRing.getNode(`User${i}`);

    if (oldServer !== newServer) {
        moved++;
    }
}

console.log(
    "Keys moved:",
    moved
);

console.log(
    "Percentage moved:",
    ((moved / 10000) * 100).toFixed(2) + "%"
);