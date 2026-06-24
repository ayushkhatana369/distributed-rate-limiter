const fs =
    require("fs");

class RaftSnapshot {

    constructor(file) {

        this.file =
            file;
    }

   save(stateMachine) {

    const data =

        Object.fromEntries(
            stateMachine.data
        );

    fs.writeFileSync(

        this.file,

        JSON.stringify(

            data,

            null,

            4

        )

    );

    console.log(
        "Snapshot Saved"
    );
}
load() {

    if (
        !fs.existsSync(
            this.file
        )
    ) {

        return new Map();
    }

    console.log(
        "Snapshot Loaded"
    );

    const data =

        JSON.parse(

            fs.readFileSync(

                this.file,

                "utf8"

            )

        );

    return new Map(
        Object.entries(data)
    );
}
}

module.exports =
    RaftSnapshot;