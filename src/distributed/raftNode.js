const RaftLog = require("./raftLog");
const StateMachine = require("./stateMachine");
const RaftTimer = require("./raftTimer");
const RaftPersistence = require("./raftPersistence");
const RaftSnapshot = require("./raftSnapshot");

class RaftNode {

    constructor(id) {

        this.id = id;

        this.state = "Follower";
        this.connected = true;

        this.term = 0;

        this.votedFor = null;
        this.log = new RaftLog ;
        this.commitIndex =0;
        this.nextIndex = {};
        this.stateMachine = new StateMachine;
        this.persistence =
          new RaftPersistence(`raft-${this.id}.json`)
          const state =
    this.persistence.load();
    this.snapshot = new RaftSnapshot(
        `snapshot-${this.id}.json`
    );
this.stateMachine.data=this.snapshot.load();
if (state) {

    this.term =
        state.term;

    this.votedFor =
        state.votedFor;

    if (this.log) {

        this.log.entries =
            state.log || [];
    }

    console.log(
        `${this.id} restored`
    );
}
   this.timer =
    new RaftTimer(

        2500,

        4000,

        () => {

            if (
                this.state ===
                "Follower"
            ) {

                console.log(
                    `${this.id} timeout`
                );

                this.becomeCandidate();
            }
        }
    );
    }

    becomeCandidate() {

        this.state = "Candidate";

        this.term++;
        this.saveState();

        this.votedFor = this.id;
        this.saveState();

        console.log(
            `${this.id} became Candidate (term ${this.term})`
        );
    }
   
   becomeLeader(cluster) {

    this.state = "Leader";

    this.nextIndex = {};

    this.saveState();

    console.log(
        `${this.id} became Leader`
    );

    if (cluster) {

        this.startHeartbeat(
            cluster
        );
    }
}
becomeFollower(term) {

    this.state = "Follower";

    this.term = term;

    this.votedFor = null;

    this.saveState();

    console.log(
        `${this.id} became Follower`
    );
}

    getInfo() {

        return {
            id: this.id,
            state: this.state,
            term: this.term,
            votedFor: this.votedFor
        };
    }
    receiveHeartbeat(term, leaderId) {
        if (!this.connected) {

    console.log(
        `${this.id} is partitioned`
    );

    return false;
}

    if (term >= this.term) {

        this.becomeFollower(term)
        this.resetElectionTimer();

        console.log(
            `${this.id} accepted heartbeat from ${leaderId}`
        );

        return true;
    }

    return false;
}
receiveAppendEntries(rpc) {

    console.log(
        `\n${this.id} received AppendEntries`
    );

    // Reject old leader
    if (
        rpc.term < this.term
    ) {

        console.log(
            `${this.id} rejected (old term)`
        );

        return false;
    }

   this.becomeFollower(rpc.term)

    // Validate previous log index
    if (
        rpc.prevLogIndex >= 0
    ) {
       if (
    rpc.prevLogIndex >=
    this.log.entries.length
) {
    console.log(
        `${this.id} rejected (missing previous log)`
    );
    return false;
}

const previous =
    this.log.entries[
        rpc.prevLogIndex
    ];

         

        if (
            previous.term !==
            rpc.prevLogTerm
        ) {

            console.log(
                `${this.id} rejected (term mismatch)`
            );

            return false;
        }
    }

    // Append new entries
    for (
        const entry
        of rpc.entries
    ) {

        this.log.entries.push(
            entry
        );
    }
this.saveState();

console.log(
    `${this.id} accepted ${rpc.entries.length} entries`
);

return true;

    return true;
}

sendHeartbeat(cluster) {

    if (this.state !== "Leader") {
        return;
    }

    console.log(
        `\n${this.id} sending heartbeats`
    );
for (const node of cluster.nodes) {

    if (
        node.id !== this.id &&
        node.connected
    ) {

        node.receiveHeartbeat(
            this.term,
            this.id
        );
    }
}
}
startHeartbeat(cluster) {

    this.heartbeatInterval =
        setInterval(() => {

            if (
                this.state === "Leader"
            ) {

                this.sendHeartbeat(
                    cluster
                );
            }

        }, 1000);
}

stopHeartbeat() {

    if (
        this.heartbeatInterval
    ) {

        clearInterval(
            this.heartbeatInterval
        );

        this.heartbeatInterval =
            null;
    }
}
fail() {

    this.stopHeartbeat();

    this.state = "Dead";

    console.log(
        `${this.id} failed`
    );
}
appendEntry(
    command
) {

    this.log.append(
        this.term,
        command
    );
 this.saveState();
    console.log(
        `${this.id} appended:`,
        command
    );
}
commitEntries() {

    while (

        this.commitIndex <
        this.log.entries.length

    ) {

        const entry =

            this.log.entries[
                this.commitIndex
            ];

        this.stateMachine.apply(

            entry.command

        );

        this.commitIndex++;

    }

    this.snapshot.save(

        this.stateMachine

    );
    this.log.entries = [];

this.saveState();

console.log(
    "Old logs removed"
);

    console.log(

        `${this.id} committed ${this.commitIndex} entries`

    );
}
startElectionTimer() {

    this.timer.start();
}

resetElectionTimer() {

    this.timer.reset();
}

stopElectionTimer() {

    this.timer.stop();
}
saveState() {

    this.persistence.save({

        term:
            this.term,

        votedFor:
            this.votedFor,

        log:
            this.log
                ? this.log.entries
                : []

    });
}
disconnect() {

    this.connected = false;

    console.log(
        `${this.id} disconnected`
    );
}

connect() {

    this.connected = true;

    console.log(
        `${this.id} reconnected`
    );
}
}

module.exports =
    RaftNode;