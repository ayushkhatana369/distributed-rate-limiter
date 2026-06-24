const fs =
    require("fs");

class RaftPersistence {

    constructor(file) {

        this.file =
            file;
    }

    save(state) {

        fs.writeFileSync(
            this.file,
            JSON.stringify(
                state,
                null,
                4
            )
        );

        console.log(
            "State Saved"
        );
    }

    load() {

        if (
            !fs.existsSync(
                this.file
            )
        ) {

            return null;
        }

        const data =
            fs.readFileSync(
                this.file,
                "utf8"
            );

        console.log(
            "State Loaded"
        );

        return JSON.parse(
            data
        );
    }
}

module.exports =
    RaftPersistence;