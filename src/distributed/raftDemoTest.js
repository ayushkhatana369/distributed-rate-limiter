const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

console.log(
    "\n==============================="
);

console.log(
    "      RAFT DEMO START"
);

console.log(
    "===============================\n"
);

// Reset cluster
for (const node of cluster.nodes) {

    node.term = 0;
    node.votedFor = null;
    node.state = "Follower";
    node.log.entries = [];
    node.commitIndex = 0;

    node.saveState();
}

console.log(
    "\nSTEP 1 : Leader Election\n"
);

cluster.startElection(
    "NodeA"
);

cluster.showCluster();

console.log(
    "\nSTEP 2 : Leader Replicates Logs\n"
);

cluster.replicateLog(
    "NodeA",
    "SET city Delhi"
);

cluster.replicateLog(
    "NodeA",
    "SET name Ayush"
);

console.log(
    "\nSTEP 3 : Commit Logs\n"
);

const leader =
    cluster.getLeader();

leader.commitEntries();

leader.stateMachine.show();

console.log(
    "\nSTEP 4 : Leader Failure\n"
);

cluster.failNode(
    "NodeA"
);

cluster.showCluster();

console.log(
    "\nSTEP 5 : New Election\n"
);

cluster.startElectionAfterFailure(
    "NodeB"
);

cluster.showCluster();

console.log(
    "\nSTEP 6 : Network Partition\n"
);

cluster.failNode(
    "NodeC"
);

cluster.showCluster();

console.log(
    "\nSTEP 7 : Heal Partition\n"
);

const nodeC =
    cluster.nodes.find(
        n => n.id === "NodeC"
    );

nodeC.state =
    "Follower";

const newLeader =
    cluster.getLeader();

if (newLeader) {

    nodeC.log.entries =
        [...newLeader.log.entries];

    console.log(
        "NodeC synchronized"
    );
}

cluster.showCluster();

console.log(
    "\n==============================="
);

console.log(
    "      RAFT DEMO COMPLETE"
);

console.log(
    "===============================\n"
);