class RaftLog {

    constructor() {

        this.entries = [];
    }

    append(
        term,
        command
    ) {

        this.entries.push({
            term,
            command
        });
    }

    getEntries() {

        return this.entries;
    }

    size() {

        return this.entries.length;
    }
}

module.exports =
    RaftLog;