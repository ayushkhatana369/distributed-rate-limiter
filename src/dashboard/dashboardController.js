const dashboardService =
    require("./dashboardService");

class DashboardController {

    overview(req, res) {

        res.json(
            dashboardService.getOverview()
        );

    }

    crash(req, res) {

        const nodeId =
            req.params.nodeId;

        const result =
            dashboardService.crashNode(
                nodeId
            );

        res.json(result);

    }
    recover(req, res) {

    const nodeId =
        req.params.nodeId;

    const result =
        dashboardService.recoverNode(
            nodeId
        );

    res.json(result);

}

}

module.exports =
    new DashboardController();