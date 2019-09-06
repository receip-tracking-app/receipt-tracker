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

const getReceipt = (receipt_id) => {
    return db('receipts_category')
        .join('receipts','receipts_category.receipts_id', '=', 'receipts.id')
        .join('category', 'receipts_category.category','=','category.id')
        .join('receipts_rimages', 'receipts_rimages.receipts_id', '=', 'receipts.id')
        .where('receipts.id', '=', receipt_id);
};

const filterReceiptsBy = async (user_id, filter, value) => {
        
        return db('receipts_category as rc')
        .join('receipts as r','rc.receipts_id', '=', 'r.id')
        .join('category as c', 'rc.category','=','c.id')
        .where(`${filter}`, '=', value);
        
}; 






module.exports = {
    //export helper methods
    getAllUsers,
    getUserById,
    getAllRecipts,
    getReceipt,
    getAllReceiptsByUser,
    filterReceiptsBy
};