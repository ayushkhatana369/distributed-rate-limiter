const fs =
    require("fs");

const path =
    require("path");

const AOF_FILE =
    path.join(
        __dirname,
        "appendonly.aof"
    );

function append(command) {

    fs.appendFileSync(
        AOF_FILE,
        command + "\n"
    );

}

module.exports = {
    append
};