const Replica =
    require("./replica");

const LoadBalancer =
    require("./loadBalancer");

const HealthManager =
    require("./healthManager");

const FailoverManager =
    require("./failoverManager");

const replica1 =
    new Replica("Replica1");

const replica2 =
    new Replica("Replica2");

const lb =
    new LoadBalancer([
        replica1,
        replica2
    ]);

const health =
    new HealthManager();

health.heartbeat(
    "Replica1"
);

health.heartbeat(
    "Replica2"
);

const failover =
    new FailoverManager(
        health,
        lb
    );

console.log(
    "Before crash:"
);

console.log(
    lb.replicas.map(
        r => r.name
    )
);

setTimeout(() => {

    console.log(
        "\nReplica1 crashed"
    );

    health.nodes.delete(
        "Replica1"
    );

}, 1000);

setTimeout(() => {

    failover.check();

    console.log(
        "\nAfter failover:"
    );

    console.log(
        lb.replicas.map(
            r => r.name
        )
    );

}, 3000);