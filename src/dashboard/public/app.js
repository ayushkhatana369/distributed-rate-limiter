async function loadDashboard() {

    try {

        const response =
            await fetch(
                "/dashboard/overview"
            );

        const data =
            await response.json();

        updateDashboard(data);

    }
    catch (error) {

        console.error(

            "Dashboard Error",

            error

        );

    }

}

function updateDashboard(data) {

    updateHeader(data);

    updateCluster(data.cluster);

    updateMetrics(data.metrics);
    
    updateAlgorithm(data.metrics)
    updateRedisExplorer(data)

}

function updateHeader(data) {

    document.getElementById(
        "leaderStatus"
    ).innerHTML =

        `👑 Leader : ${data.cluster.leader}`;

    document.getElementById(
        "storageStatus"
    ).innerHTML =

        "💾 Storage : MiniRedis";

}

function updateCluster(cluster) {

    const card =
        document.getElementById(
            "clusterCard"
        );

    const visual =
        document.getElementById(
            "clusterVisualization"
        );

    let html = "";

    let topology = "";

    cluster.nodes.forEach(node => {

        html += `

            <p>

                <strong>${node.id}</strong>

                (${node.state})

                | Term : ${node.term}

            </p>

        `;

        let icon = "🖥";

        let cssClass = "";

        if (node.state === "Leader") {

            icon = "👑";

            cssClass = "leader heartbeat";

        }

        else if (node.state === "Candidate") {

            icon = "🗳";

            cssClass = "candidate";

        }

        else if (node.state === "Dead") {

            icon = "💀";

            cssClass = "dead";

        }

       let actionButton = "";

if (node.state === "Dead") {

    actionButton = `

        <button
            onclick="recoverNode('${node.id}')">

            ♻ Recover

        </button>

    `;

}
else {

    actionButton = `

        <button
            onclick="crashNode('${node.id}')">

            💥 Crash

        </button>

    `;

}

topology += `

    <div class="node ${cssClass}">

        <h3>

            ${icon}

        </h3>

        <p>

            ${node.id}

        </p>

        <small>

            ${node.state}

        </small>

        <br>

        <small>

            Term ${node.term}

        </small>

        <br><br>

        ${actionButton}

    </div>

`;

               

    });

    card.innerHTML = html;

    visual.innerHTML = topology;

}

function updateMetrics(metrics) {

    const card =
        document.getElementById(
            "metricsCard"
        );

    card.innerHTML = `

        <p>

            Algorithm :
            ${metrics.algorithm}

        </p>

        <p>

            Total :
            ${metrics.totalRequests}

        </p>

        <p>

            Allowed :
            ${metrics.allowedRequests}

        </p>

        <p>

            Blocked :
            ${metrics.blockedRequests}

        </p>

        <p>

            Active Users :
            ${metrics.activeUsers}

        </p>

    `;

}
function updateAlgorithm(metrics) {

    const card =
        document.getElementById(
            "algorithmCard"
        );

    card.innerHTML = `

        <h3>

            ${metrics.algorithm}

        </h3>

        <p>

            Running on all cluster nodes

        </p>

        <p>

            Replicated through Raft

        </p>

    `;

}
async function crashNode(
    nodeId
) {

    try {

        await fetch(

            `/dashboard/crash/${nodeId}`,

            {

                method: "POST"

            }

        );

        loadDashboard();

    }

    catch (error) {

        console.error(

            error

        );

    }

}
async function recoverNode(nodeId) {

    await fetch(

        `/dashboard/recover/${nodeId}`,

        {

            method: "POST"

        }

    );

    loadDashboard();

}
loadDashboard();

setInterval(

    loadDashboard,

    2000

);