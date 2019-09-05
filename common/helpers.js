// This file is for the data models 
const db = require('../data/dbConfig');

const getAllUsers = () => {
    return db('users');
};

const getUserById = (user_id) => {
    return db('users').where(user_id);
};

const getAllRecipts = () => {
    return db('receipts');
};

const getAllReceiptsByUser = (user_id) => {
    
};

const getReceipt = (receipt_id) => {
    return db('receipts_category')
        .join('receipts','receipts_category.receipts_id', '=', 'receipts.id')
        .join('category', 'receipts_category.category','=','category.id')
        .join('receipt_rimages', 'receipts_rimages.receipts_id', '=', 'receipts.id')
        .where('receipts.id', '=', receipt_id);
};




module.exports = {
    //export helper methods
    getAllUsers,
    getUserById,
    getAllRecipts,
    getReceipt
};