const db =
    require("./database");

db.set(
    "name",
    "Ayush"
);

db.set(
    "role",
    "Developer"
);

console.log(
    db.get("name")
);

console.log(
    db.exists("role")
);

console.log(
    db.keys()
);

db.del("role");

console.log(
    db.keys()
);