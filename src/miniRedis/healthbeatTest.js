const HealthManager =
    require("./healthManager");

const health =
    new HealthManager();

setInterval(() => {

    health.heartbeat(
        "Replica1"
    );

    console.log(
        "Heartbeat from Replica1"
    );

}, 2000);

setInterval(() => {

    console.log(
        "Replica1 Alive:",
        health.isAlive(
            "Replica1"
        )
    );

}, 3000);