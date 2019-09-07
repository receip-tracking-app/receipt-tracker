// This file is for the data models 
const db = require('../data/dbConfig');

const getAllUsers = () => {
    return db('users');
};

const getUserById = (user_id) => {
    return db('users').where('users.id', '=', user_id);
};

const getAllRecipts = () => {
    return db('receipts');
};

const getAllReceiptsByUser = (user_id) => {
    return db('users_receipts as ur')
    .join('receipts as r', 'ur.receipts_id', '=', 'r.id')
    .join('users as u', 'ur.users_id', '=', 'u.id')
    .where('u.id','=', user_id);
};

const getAllCategories = () => {
    return db('category');
};

const getReceipt = (receipt_id) => {
    return db('receipts_category')
        .join('receipts','receipts_category.receipts_id', '=', 'receipts.id')
        .join('category', 'receipts_category.category','=','category.id')
        .join('receipts_rimages', 'receipts_rimages.receipts_id', '=', 'receipts.id')
        .where('receipts.id', '=', receipt_id);
};

const filterReceiptsBy = (user_id, filter, value) => {
        return db('users_receipts as ur')
        .join('users as u', 'ur.users_id', 'u.id')
        .join('receipts as r', 'ur.receipts_id', 'r.id')
        .join('receipts_category as rc', 'r.id', 'rc.receipts_id')
        .join('category as c', 'rc.category', 'c.id')
        .where(filter, '=', value)
        .andWhere('users_id', '=', user_id);
}; 

const addUser = (user) => {
    return db('users').insert(user);
}


//POST- add a category
const addCategory = (category) => {
    return db('category').insert(category);
};

//POST- add a receipt


//POST- add a image and associate with a receipt
//PUT- update users imformation 
//PUT- update a receipts information
//PUT- update a categorys informaton
//DELETE - user
//DELETE - receipt
//DELETE - cagtegory
//DELETE - image





module.exports = {
    //export helper methods
    getAllUsers,
    getUserById,
    getAllRecipts,
    getReceipt,
    getAllReceiptsByUser,
    filterReceiptsBy,
    addUser, 
    addCategory,
    getAllCategories
};