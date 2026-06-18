const express = require("express");

const redisClient = require("../config/redis");

const router = express.Router();

router.get("/transaction", async (req, res) => {

    const result =
        await redisClient
            .multi()
            .incr("txn_counter")
            .expire("txn_counter", 60)
            .exec();

    res.json({
        success: true,
        result
    });

});

router.get("/txn-count", async (req, res) => {

    const count =
        await redisClient.get(
            "txn_counter"
        );

    res.json({
        counter:
            Number(count || 0)
    });

});

router.get("/txn-reset", async (req, res) => {

    await redisClient.del(
        "txn_counter"
    );

    res.json({
        success: true
    });

});

module.exports = router;