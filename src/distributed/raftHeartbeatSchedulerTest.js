const RaftCluster =
    require("./raftCluster");

const cluster =
    new RaftCluster();

for (const node of cluster.nodes) {

    node.term = 0;
    node.votedFor = null;
    node.state = "Follower";

    node.saveState();
}

cluster.startElection(
    "NodeA"
);

setTimeout(() => {

    console.log(
        "\nStopping..."
    );

    process.exit();

}, 6000);