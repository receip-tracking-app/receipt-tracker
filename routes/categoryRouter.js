const express = require('express');
const db = require('../common/helpers');

const router = express.Router();



//Get All Categories
router.get('/categories', async (req, res) => {
    try{
        const categories = await db.getAllCategories();
        res.status(200).json(categories);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


//Get Category By Name
router.get('/:name', async (req,res) => { 
    const {name} = req.params;
    try{
        const [{id}] = await db.getCategoryByName(name);
        res.status(200).json(id);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

// Add New Category 
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

//Update Category By ID
router.put('/updateCategory/:id', async (req, res) => {
        const { id } = req.params;
        const category = req.body;

        try{
            const updated = await db.updateCategory(category, id );
            res.status(201).json({
                status: 'Success',
                updated});
        }
        catch({ message }){
            res.status(500).json(message);
        }
});


// Delete the category
router.delete('/removeCategory/:id', async (req, res) => {
            const { id } = req.params;

            try{
                const deleted = await db.removeCategory(id);
                res.status(200).json({
                    message: "The category was successfully deleted"
                });
            }
            catch({message}) {
                res.status(500).json(message);
            }
});



module.exports = router;