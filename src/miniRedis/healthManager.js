class HealthManager {
    constructor() {
        this.nodes =
            new Map();
    }
    heartbeat(nodeId) {
        this.nodes.set(
            nodeId,
            Date.now()
        );
    }
    isAlive(nodeId) {
        const lastSeen =
            this.nodes.get(nodeId);
        if (!lastSeen)
            return false;
        return (
            Date.now() -
            lastSeen
        ) < 5000;
    }
}
module.exports =
    HealthManager;