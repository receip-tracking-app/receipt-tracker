// This file is for the data models 
const db = require('../data/dbConfig');

const getAllUsers = () => {
    return db('users');
};

const findUserBy = (filter) => {
    return db('users').where(filter);
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
    .where('u.id','=', user_id).select('r.id', 'merchant', 'transactionDate', 'amountSpent', 'r.created_at');
};

const getAllCategories = () => {
    return db('category');
};

const getCategoryByName = (category_name) => {
    return db('category').where('categoryName', '=', category_name).select('id');
};

const getReceipt = (receipt_id) => {
    return db('receipts_category')
        .join('receipts','receipts_category.receipts_id', '=', 'receipts.id')
        .join('category', 'receipts_category.category','=','category.id')
      //  .join('receipts_rimages', 'receipts_rimages.receipts_id', '=', 'receipts.id')
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

const getRImages = () => {
    return db('rimages');
};

const addUser = (user) => {
    return db('users').insert(user);
};


//POST- add a category
const addCategory = (category) => {
    return db('category').insert(category);
};

//POST- add a receipt
const addReciept  = (receipt) => {
    return db('receipts').insert(receipt);
};

//POST- add Image 
const addImage = (image_url) => {
    return db('rimages').insert(image_url);
};

const addToUsersReceiptsTbl = (recordFK) => {
    return db('users_receipts').insert(recordFK);
};

const addToReceiptsCategoryTbl = (recordFK) => {
    return db('receipts_category').insert(recordFK);
};

//PUT- update users imformation 
const updateUser = (updatedUser ,id) => {
    return db('users')
           .where({id})
           .update(updatedUser);
};

//PUT- update a receipts information
const updateReceipt = (updatedReceipt, id) => {
        return db('receipts')
                .where({id})
                .update(updatedReceipt);
};


//PUT- update a categorys informaton
const updateCategory = (updatedCategory, id) => {
    return db('category')
            .where({id})
            .update(updatedCategory);
};

//DELETE - user
const removeUser = (id) => {
    return db('users')
            .where({id})
            .delete();
};

//DELETE - receipt
const removeReceipt = (id) => {
    return db('receipts')
           .where({id})
           .delete();
};


//DELETE - cagtegory
const removeCategory = (id) => {
        return db('category')
                .where({id})
                .delete();
};

//DELETE - image





module.exports = {
    //export helper methods
    getAllUsers,
    getUserById,
    getAllRecipts,
    getReceipt,
    getAllReceiptsByUser,
    findUserBy,
    filterReceiptsBy,
    addUser, 
    addToUsersReceiptsTbl,
    addCategory,
    addReciept,
    getAllCategories, 
    getCategoryByName,
    addImage,
    getRImages,
    addToReceiptsCategoryTbl, 
    updateCategory, 
    removeCategory,
    updateUser,
    removeUser,
    updateReceipt, 
    removeReceipt
};