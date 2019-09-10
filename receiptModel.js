const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
    get,
    getById,
    insertReceipt,
    update,
    remove
};

function get(userId, searchingParam) {
    const condition = {
        users_id: userId
    };
    return db("receipts as r")
        .join("users_receipts as ur", "r.id", "ur.receipts_id")
        .where(condition)
        .select(
            "r.id",
            "r.created_at",
            "r.transactionDate",
            "r.merchant",
            "r.amountSpent"
        );
}

function getById(id) {
    let query = db("tasks as t");
    query.where("t.id", id).first();
    return query.then(function(results) {
        return results;
    });
}

function insertReceipt(receipt) {
    return db("receipts")
        .insert(receipt)
        .then(([id]) => this.getById(id));
}

function update(id, receipt) {
    return db("posts");
    return db("comments")
        .join("posts", "posts.id", "post_id")
        .select("comments.*", "title as post")
        .where("post_id", postId)
        .update(post);
}

function remove(id) {
    return db("posts");
    return db("comments")
        .join("posts", "posts.id", "post_id")
        .select("comments.*", "title as post")
        .where("post_id", postId)
        .update(post);
}
