const express = require("express");

const router = express.Router();

router.get("/race", async (req, res) => {

    await new Promise(resolve =>
        setTimeout(resolve, 2000)
    );

    res.json({
        success: true,
        message: "Race Route"
    });

});

module.exports = router;