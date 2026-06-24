const Store =
    require("./store");

const store =
    new Store();

store.set(
    "otp",
    "1234",
    5
);

console.log(
    "Immediately:",
    store.get("otp")
);

setTimeout(() => {

    console.log(
        "After 6 seconds:",
        store.get("otp")
    );

}, 6000);