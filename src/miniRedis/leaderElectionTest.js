const Replica =
    require("./replica");

const LeaderElection =
    require("./leaderElection");

const replica1 =
    new Replica("Replica1");

const replica2 =
    new Replica("Replica2");

const replica3 =
    new Replica("Replica3");

const election =
    new LeaderElection([
        replica1,
        replica2,
        replica3
    ]);

const master =
    election.electLeader();

console.log(
    "Initial Master:",
    master.name
);

console.log(
    "\nMaster crashed:",
    master.name
);

election.replicas.shift();

const newMaster =
    election.electLeader();

console.log(
    "\nNew Master:",
    newMaster.name
);