const RaftNode =
    require("./raftNode");

console.log(
    "\n========== First Start =========="
);

let node =
    new RaftNode(
        "NodeA"
    );

node.becomeCandidate();

node.becomeLeader();

node.appendEntry(
    "SET city Delhi"
);

node.appendEntry(
    "SET name Ayush"
);

console.log(
    "\nBefore Crash"
);

console.log(
    "Term:",
    node.term
);

console.log(
    "Voted For:",
    node.votedFor
);

console.log(
    "Log:",
    node.log.getEntries()
);

console.log(
    "\nNode Crashed...\n"
);

node =
    null;

console.log(
    "========== Restart =========="
);

const recovered =
    new RaftNode(
        "NodeA"
    );

console.log(
    "\nRecovered State"
);

console.log(
    "Term:",
    recovered.term
);

console.log(
    "Voted For:",
    recovered.votedFor
);

console.log(
    "Log:",
    recovered.log.getEntries()
);