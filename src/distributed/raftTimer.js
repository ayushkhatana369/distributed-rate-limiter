class RaftTimer {

   constructor(
    minTimeout,
    maxTimeout,
    onTimeout
) {

    this.minTimeout =
        minTimeout;

    this.maxTimeout =
        maxTimeout;

    this.onTimeout =
        onTimeout;

    this.timer =
        null;
}

    start() {

        this.stop();
    const timeout =
    this.getRandomTimeout();

console.log(
    `Timer = ${timeout} ms`
);

this.timer =
    setTimeout(() => {

        console.log(
            "Election timeout"
        );

        this.onTimeout();

    }, timeout);
    }

    reset() {

        this.start();
    }

    stop() {

        if (
            this.timer
        ) {

            clearTimeout(
                this.timer
            );
        }
    }
    getRandomTimeout() {

    return Math.floor(

        Math.random()

        *

        (
            this.maxTimeout
            -
            this.minTimeout
            +
            1
        )

    )

    +

    this.minTimeout;
}
}

module.exports =
    RaftTimer;