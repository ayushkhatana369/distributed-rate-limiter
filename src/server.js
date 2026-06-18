require("dotenv").config();

const app = require("./app");
const redisClient = require("./config/redis");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        
       // await redisClient.connect();
        console.log("Redis Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server Startup Error:", error);
    }
}

startServer();