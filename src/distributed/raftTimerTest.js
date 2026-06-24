const RaftNode =
    require("./raftNode");

const node =
    new RaftNode(
        "NodeA"
    );

console.log(
    "\nFollower started"
);

node.startElectionTimer();

setTimeout(() => {

    console.log(
        "\nHeartbeat"
    );

    node.resetElectionTimer();

}, 1000);

setTimeout(() => {

    console.log(
        "\nWaiting..."
    );

}, 2000);

setTimeout(() => {

    process.exit(0);

}, 7000);