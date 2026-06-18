const express = require("express");

const redisClient = require("../config/redis");

const router = express.Router();

router.get("/lua", async (req, res) => {

    const result =
        await redisClient.eval(

            `
            local count =
                redis.call(
                    "INCR",
                    KEYS[1]
                )

            redis.call(
                "EXPIRE",
                KEYS[1],
                60
            )

            return count
            `,

            {
                keys: ["lua_counter"]
            }

        );

    res.json({
        success: true,
        counter: result
    });

});

router.get("/lua-count", async (req, res) => {

    const count =
        await redisClient.get(
            "lua_counter"
        );

    res.json({
        counter:
            Number(count || 0)
    });

});

router.get("/lua-reset", async (req, res) => {

    await redisClient.del(
        "lua_counter"
    );

    res.json({
        success: true
    });

});

module.exports = router;