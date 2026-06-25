const {
    getCluster
} = require(
    "../distributed/bootstrap"
);

class SimulatorController {

    crashNode(
        req,
        res
    ) {

        const cluster =
            getCluster();

        cluster.failNode(
            req.params.id
        );

        res.json({

            success: true

        });

    }

    recoverNode(
        req,
        res
    ) {

        const cluster =
            getCluster();

        cluster.recoverNode(
            req.params.id
        );

        res.json({

            success: true

        });

    }

}

module.exports =
    new SimulatorController();