const fs = require("fs");
const path = require("path");

const SNAPSHOT_FILE =
    path.join(
        __dirname,
        "dump.rdb"
    );

function loadSnapshot(store) {

    if (
        !fs.existsSync(
            SNAPSHOT_FILE
        )
    ) {
        return;
    }

    const data =
        JSON.parse(
            fs.readFileSync(
                SNAPSHOT_FILE,
                "utf8"
            )
        );

    for (
        const key in data
    ) {

        store.data.set(
            key,
            data[key]
        );

    }

}

module.exports =
    loadSnapshot;