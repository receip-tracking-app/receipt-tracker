const express = require('express');
const db = require('../common/helpers');

const router = express.Router();




router.get('/categories', async (req, res) => {
    try{
        const categories = await db.getAllCategories();
        res.status(200).json(categories);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


router.get('/:name', async (req,res) => { // DELETE ME!!! I was just around for testing purposes
    const {name} = req.params;
    try{
        const [{id}] = await db.getCategoryByName(name);
        res.status(200).json(id);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


router.post('/createCategory', async (req,res) => {
    const newCategory = req.body;
    try{
        const record = await db.addCategory(newCategory);
        res.status(201).json({message: `The category ${newCategory.categoryName} was added successfully.`})
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});






module.exports = router;