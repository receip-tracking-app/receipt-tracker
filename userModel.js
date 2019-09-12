const db = require("./data/dbConfig.js");

module.exports = {
    add,
    findBy,
    findById
};

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user);

    return findById(id);
}

function findById(user_id) {
    console.log(user_id);
    return db("users")
        .where("users.id")
        .first();
}
