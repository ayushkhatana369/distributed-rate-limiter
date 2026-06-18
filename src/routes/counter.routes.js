const express = require("express");

const redisClient = require("../config/redis");

const router = express.Router();

router.get("/broken", async (req, res) => {

    let count =
        await redisClient.get("counter");

    count = Number(count || 0);

    // Artificial delay
    await new Promise(resolve =>
        setTimeout(resolve, 1000)
    );

    count++;

    await redisClient.set(
        "counter",
        count
    );

    res.json({
        success: true,
        count
    });

});

router.get("/count", async (req, res) => {

    const count =
        await redisClient.get("counter");

    res.json({
        counter:
            Number(count || 0)
    });

});

router.get("/reset", async (req, res) => {

    await redisClient.set(
        "counter",
        0
    );

    res.json({
        success: true
    });

});

module.exports = router;