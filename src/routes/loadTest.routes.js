const express = require("express");

const router = express.Router();

router.get("/heavy", (req, res) => {

    setTimeout(() => {

        res.json({
            success: true,
            message: "Heavy endpoint"
        });

    }, 1000);

});

module.exports = router;