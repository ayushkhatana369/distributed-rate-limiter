class AppendEntriesRPC {

    constructor(

        term,

        leaderId,

        prevLogIndex,

        prevLogTerm,

        entries,

        leaderCommit

    ) {

        this.term =
            term;

        this.leaderId =
            leaderId;

        this.prevLogIndex =
            prevLogIndex;

        this.prevLogTerm =
            prevLogTerm;

        this.entries =
            entries;

        this.leaderCommit =
            leaderCommit;
    }
}

module.exports =
    AppendEntriesRPC;