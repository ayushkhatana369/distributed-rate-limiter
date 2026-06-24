class FailoverManager {

    constructor(
        healthManager,
        loadBalancer
    ) {
        this.healthManager =
            healthManager;

        this.loadBalancer =
            loadBalancer;
    }

    check() {

        this.loadBalancer.replicas =
            this.loadBalancer.replicas.filter(
                replica =>
                    this.healthManager.isAlive(
                        replica.name
                    )
            );
    }
}

module.exports =
    FailoverManager;