const HealthManager =
    require("./healthManager");

const health =
    new HealthManager();

let heartbeats = 0;

const sender =
    setInterval(() => {

        health.heartbeat(
            "Replica1"
        );

        heartbeats++;

        console.log(
            "Heartbeat sent"
        );

        if (
            heartbeats === 3
        ) {

            clearInterval(
                sender
            );

            console.log(
                "\nReplica1 CRASHED\n"
            );
        }

    }, 2000);

setInterval(() => {

    console.log(
        "Alive:",
        health.isAlive(
            "Replica1"
        )
    );

}, 3000);