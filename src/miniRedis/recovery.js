const fs = require("fs");
const path = require("path");

const AOF_FILE =
    path.join(__dirname, "appendonly.aof");

function recover(store) {

    if (!fs.existsSync(AOF_FILE))
        return;

    const lines =
        fs.readFileSync(
            AOF_FILE,
            "utf8"
        )
        .split("\n")
        .filter(Boolean);

    for (const line of lines) {

        const parts =
            line.split(" ");

        const command =
            parts[0];

        if (command === "SET") {

            const key =
                parts[1];

            const value =
                parts.slice(2).join(" ");

            store.data.set(
                key,
                value
            );

        }

        else if (
            command === "DEL"
        ) {

            store.data.delete(
                parts[1]
            );

        }

    }

}

module.exports = recover;