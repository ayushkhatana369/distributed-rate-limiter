require("dotenv").config();

const app = require("./app");

app.listen(5001, () => {
    console.log(
        "Server2 running on 5001"
    );
});