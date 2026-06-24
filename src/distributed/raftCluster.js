const RaftNode =
    require("./raftNode");
const AppendEntriesRPC = 
require("./appendEntriesRpc")

class RaftCluster {

    constructor() {

        this.nodes = [
            new RaftNode("NodeA"),
            new RaftNode("NodeB"),
            new RaftNode("NodeC")
        ];
    }

    requestVote(candidate) {

        let votes = 1;

        for (
            const node
            of this.nodes
        ) {

            if (
                node.id === candidate.id
            ) {
                continue;
            }

            if (
                node.votedFor === null
            ) {

                node.votedFor =
                    candidate.id;

                votes++;

                console.log(
                    `${node.id} voted for ${candidate.id}`
                );
            }
        }

        return votes;
    }

    startElection(nodeId) {

        const candidate =
            this.nodes.find(
                node =>
                    node.id === nodeId
            );

        candidate.becomeCandidate();

        const votes =
            this.requestVote(
                candidate
            );

        console.log(
            `Votes received: ${votes}`
        );

        if (votes >= 2) {

            candidate.becomeLeader(this);
        }
    }

    showCluster() {

        console.log(
            "\nCluster State"
        );

        for (
            const node
            of this.nodes
        ) {

            console.log(
                node.getInfo()
            );
        }
    }
    getLeader() {

    return this.nodes.find(
        node =>
            node.state === "Leader"
    );
}
failNode(nodeId) {

    const node =
        this.nodes.find(
            n => n.id === nodeId
        );

    if (node) {

        node.fail();
    }
}
startElectionAfterFailure(
    candidateId
) {

    const candidate =
        this.nodes.find(
            n =>
                n.id === candidateId
        );

    if (
        !candidate ||
        candidate.state === "Dead"
    ) {

        return;
    }

    candidate.becomeCandidate();

    let votes = 1;

    for (
        const node
        of this.nodes
    ) {

        if (
            node.id === candidate.id
        ) {
            continue;
        }

        if (
            node.state === "Dead"
        ) {
            continue;
        }

        node.votedFor =
            candidate.id;

        votes++;

        console.log(
            `${node.id} voted for ${candidate.id}`
        );
    }

    console.log(
        `Votes received: ${votes}`
    );

    const totalNodes =
    this.nodes.length;

const majority =
    Math.floor(
        totalNodes / 2
    ) + 1;

     if (
    votes >= majority
) {

    candidate.becomeLeader();
}
else {

    console.log(
        `${candidate.id} could not become Leader`
    );

    console.log(
        `Need ${majority} votes but got ${votes}`
    );
}
}
replicateLog(
    leaderId,
    command
) {

    const leader =
        this.nodes.find(
            n =>
                n.id === leaderId
        );

    if (
        !leader ||
        leader.state !== "Leader"
    ) {

        console.log(
            "Leader not found"
        );

        return;
    }

    leader.appendEntry(
        command
    );

    for (const node of this.nodes) {

    if (node.id !== leader.id) {

        if (!leader.nextIndex[node.id]) {

            leader.nextIndex[node.id] =
                leader.log.entries.length;
        }
    }
}

    for (
        const node
        of this.nodes
    ) {

        if (
            node.id !== leaderId &&
            node.state !== "Dead"
        ) {

          const rpc =
    new AppendEntriesRPC(

        leader.term,

        leader.id,

        leader.log.entries.length - 2,

        leader.log.entries.length > 1
            ? leader.log.entries[
                leader.log.entries.length - 2
            ].term
            : -1,

        [
            leader.log.entries[
                leader.log.entries.length - 1
            ]
        ],

        leader.commitIndex
    );

const success =
    node.receiveAppendEntries(
        rpc
    );

if (success) {

    console.log(
        `${node.id} accepted RPC`
    );

}
else {

    console.log(
        `${node.id} rejected RPC`
    );

    leader.nextIndex[node.id]--;

    console.log(

        `${node.id} nextIndex -> ${leader.nextIndex[node.id]}`

    );
}
        }
    }
}
}

module.exports =
    RaftCluster;