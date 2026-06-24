const RaftNode =
    require("./raftNode");

const nodeA =
    new RaftNode(
        "NodeA"
    );

console.log(
    "\nInitial"
);

console.log(
    nodeA.getInfo()
);

nodeA.becomeCandidate();

console.log(
    "\nAfter Election Timeout"
);

console.log(
    nodeA.getInfo()
);

nodeA.becomeLeader();

console.log(
    "\nAfter Winning Election"
);

console.log(
    nodeA.getInfo()
);

nodeA.becomeFollower(
    2
);

console.log(
    "\nAfter Higher Term Seen"
);

console.log(
    nodeA.getInfo()
);