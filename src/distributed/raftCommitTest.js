const RaftNode =
    require("./raftNode");

const node =
    new RaftNode("NodeA");

node.becomeLeader();

node.appendEntry(
    "SET city Delhi"
);

node.appendEntry(
    "SET name Ayush"
);

console.log(
    "\nBefore Commit"
);

console.log(
    node.log.getEntries()
);

console.log(
    node.stateMachine.store
);

node.commitEntries();

console.log(
    "\nLogs After Compaction"
);

console.log(
    node.log.entries
);

console.log(
    "\nAfter Commit"
);


    node.stateMachine.show()
