const VersionedStore =
    require("./versionedStore");

const store =
    new VersionedStore();

store.put(
    "user",
    "Ayush",
    "NodeA"
);

console.log(
    "Version 1:"
);

console.log(
    store.get("user")
);

store.put(
    "user",
    "AyushKhatana",
    "NodeA"
);

console.log(
    "\nVersion 2:"
);

console.log(
    store.get("user")
);

store.put(
    "user",
    "AyushGurjar",
    "NodeB"
);

console.log(
    "\nVersion 3:"
);

console.log(
    store.get("user")
);