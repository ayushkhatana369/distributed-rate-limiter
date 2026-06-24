const Store =
    require("./store");

const store =
    new Store();

store.set(
    "session",
    "abc123",
    5
);

console.log(
    "Before:",
    store.keys()
);

setTimeout(() => {

    console.log(
        "After:",
        store.keys()
    );

}, 7000);