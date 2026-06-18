const express = require("express");

const redisClient = require("../config/redis");

const router = express.Router();

router.get("/atomic", async (req, res) => {

    const count =
        await redisClient.incr(
            "atomic_counter"
        );

    res.json({
        success: true,
        count
    });

});

router.get("/atomic-count", async (req, res) => {

    const count =
        await redisClient.get(
            "atomic_counter"
        );

    res.json({
        counter:
            Number(count || 0)
    });

});

router.get("/atomic-reset", async (req, res) => {

    await redisClient.set(
        "atomic_counter",
        0
    );

    res.json({
        success: true
    });

});

module.exports = router;