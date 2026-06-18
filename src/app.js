const express = require("express");
const createLeakyBucketLimiter =require("./middleware/leakyBucket");
const app = express();
const apiLimiter =  createLeakyBucketLimiter(5, 60);
const loadTestRoutes = require("./routes/loadTest.routes");
const raceRoutes = require("./routes/race.routes");
const counterRoutes = require("./routes/counter.routes");
const atomicRoutes =require("./routes/atomic.routes");
const transactionRoutes =require("./routes/transaction.routes");
const luaRoutes =require("./routes/lua.routes");
const createLuaFixedWindowLimiter =require("./middleware/luaFixedWindow");

const luaLimiter =
createLuaFixedWindowLimiter(
    5,
    60
);
app.get(
    "/lua-fixed",
    luaLimiter,
    (req, res) => {

        res.json({
            success: true,
            message:
                "Lua Fixed Window Working"
        });

    }
);

//const loginLimiter = createRateLimiter(3, 60);
app.get("/", apiLimiter, (req, res) => {
    res.json({
        success: true,
        message: "API Working"
    });
});


app.use("/api",
    raceRoutes
);

app.use("/api",
    loadTestRoutes
);

/*app.get("/login", loginLimiter, (req, res) => {
    res.json({
        success: true,
        message: "Login Route"
    });
}); */
app.use("/api",
    counterRoutes
);
app.use("/api",
    atomicRoutes
);
app.use("/api",
    transactionRoutes
);
app.use("/api",
    luaRoutes);
module.exports = app;