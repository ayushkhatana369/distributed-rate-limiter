const express =
    require("express");

const path =
    require("path");

const router =
    express.Router();

const dashboardController =
    require("./dashboardController");

router.get(
    "/overview",
    dashboardController.overview
);
router.post("/crash/:nodeId",dashboardController.crash)
router.post("/recover/:nodeId",dashboardController.recover)

router.use(

    express.static(

        path.join(
            __dirname,
            "public"
        )

    )

);

router.get(
    "/",
    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "public",

                "index.html"

            )

        );

    }
);

module.exports =
    router;