const express = require('express');
const db = require('../common/helpers');
const router = express.Router();



//Get All Receipts
router.get('/receipts', async (req, res) => {
    try {
        const receipts = await db.getAllRecipts();
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


//Get receipt by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const receipt = await db.getReceipt(id);
        res.status(200).json(receipt);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});



//Update Receipt
router.put('/updateReceipt/:id', async (req, res)=>{
    const { id } = req.params;
    const updatedReceipt = req.body;

    try{
        const updated = await db.updateReceipt(updatedReceipt, id);
         res.status(200).json({message: `The receipt was updated.`});
    }
    catch({message}){
        res.status(500).json(message);
    }
});


//Delete Receipt
router.delete('/removeReceipt/:id', async (req,res) => {
        const { id } = req.params;

        try{
            const deleted = await db.removeReceipt(id);
            res.status(200).json({message:'The receipt was successfully removed'});
        }
        catch({message}){
            res.status(500).json(message);
        }
});









module.exports = router;