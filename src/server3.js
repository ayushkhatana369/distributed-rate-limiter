require("dotenv").config();

const app = require("./app");

app.listen(5002, () => {
    console.log(
        "Server3 running on 5002"
    );
});