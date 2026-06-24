const Master =
    require("./master");

const Replica =
    require("./replica");

const LoadBalancer =
    require("./loadBalancer");

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

const lb =
    new LoadBalancer([
        replica1,
        replica2
    ]);

for (
    let i = 1;
    i <= 6;
    i++
) {

    const replica =
        lb.getReplica();

   console.log(
    `Request ${i} served by Replica ${
        replica === replica1
            ? 1
            : 2
    }`
);

}