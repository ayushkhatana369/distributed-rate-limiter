require("dotenv").config();

const app = require("./app");

app.listen(5000, () => {
    console.log(
        "Server1 running on 5000"
    );
});