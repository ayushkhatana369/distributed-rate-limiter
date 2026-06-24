class StateMachine {

    constructor() {

        this.data =
            new Map();
    }

    apply(command) {

        const parts =
            command.split(" ");

        const operation =
            parts[0];

        if (
            operation === "SET"
        ) {

            const key =
                parts[1];

            const value =
                parts[2];

            this.data.set(
                key,
                value
            );

            console.log(
                `Applied -> ${key} = ${value}`
            );
        }
    }

    get(key) {

        return this.data.get(
            key
        );
    }

    show() {

        console.log(
            Object.fromEntries(
                this.data
            )
        );
    }
}

module.exports =
    StateMachine;