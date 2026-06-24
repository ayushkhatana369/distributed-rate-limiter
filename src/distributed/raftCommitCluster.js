const RaftNode =
    require("./raftNode");

const RaftLog =
    require("./raftLog");

class RaftCommitCluster {

    constructor() {

        this.nodes = [];
    }

    addNode(id) {

        const node =
            new RaftNode(id);

        node.log =
            new RaftLog();

        this.nodes.push(node);

        return node;
    }

    electLeader(id) {

        const leader =
            this.nodes.find(
                node => node.id === id
            );

        leader.becomeLeader();

        return leader;
    }

    replicateAndCommit(
        command
    ) {

        const leader =
            this.nodes.find(
                node =>
                    node.state ===
                    "Leader"
            );

        if (!leader) {

            console.log(
                "No Leader"
            );

            return;
        }

        leader.log.append(
            leader.currentTerm,
            command
        );

        console.log(
            `Leader appended ${command}`
        );

        let acknowledgements =
            1;

        for (
            const node
            of this.nodes
        ) {

            if (
                node === leader
            ) {
                continue;
            }

            if (
                node.state ===
                "Dead"
            ) {
                continue;
            }

            node.log.entries =
                JSON.parse(
                    JSON.stringify(
                        leader.log.entries
                    )
                );

            acknowledgements++;

            console.log(
                `${node.id} ACK`
            );
        }

        console.log(
            `ACKs = ${acknowledgements}`
        );

        const majority =
            Math.floor(
                this.nodes.length / 2
            ) + 1;

        if (
            acknowledgements >=
            majority
        ) {
             leader.commitIndex =
    leader.log.entries.length;

leader.stateMachine.apply(
    command
);

for (
    const node
    of this.nodes
) {

    if (
        node === leader
    ) {
        continue;
    }

    if (
        node.state ===
        "Dead"
    ) {
        continue;
    }

    node.commitIndex =
        leader.commitIndex;

    node.stateMachine.apply(
        command
    );
}

console.log(
    "COMMITTED"
);
           
        }
        else {

            console.log(
                "NOT COMMITTED"
            );
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

            console.log({
                id: node.id,
                state: node.state,
                commitIndex:
                    node.commitIndex || 0
            });
        }
    }
}

module.exports =
    RaftCommitCluster;