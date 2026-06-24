const saveSnapshot =
    require("./snapshot");

function startSnapshotWorker(
    store
) {

    setInterval(() => {

        saveSnapshot(
            store
        );

        console.log(
            "Snapshot Saved"
        );

    }, 10000);

}

module.exports =
    startSnapshotWorker;