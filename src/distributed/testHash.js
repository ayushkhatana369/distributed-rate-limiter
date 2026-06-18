const ConsistentHashRing =
    require("./consistentHash");

const ring =
    new ConsistentHashRing(200);

ring.addNode("ServerA");
ring.addNode("ServerB");
ring.addNode("ServerC");

const count = {
    ServerA: 0,
    ServerB: 0,
    ServerC: 0
};

for (let i = 1; i <= 10000; i++) {

    const server =
        ring.getNode(`User${i}`);

    count[server]++;
}

console.log("\nDistribution:\n");
console.log(count);