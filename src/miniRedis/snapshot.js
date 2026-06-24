const fs =
    require("fs");

const path =
    require("path");

const SNAPSHOT_FILE =
    path.join(
        __dirname,
        "dump.rdb"
    );

function saveSnapshot(store) {

    const data =
        Object.fromEntries(
            store.data
        );

    fs.writeFileSync(
        SNAPSHOT_FILE,
        JSON.stringify(
            data,
            null,
            2
        )
    );

}

module.exports =
    saveSnapshot;