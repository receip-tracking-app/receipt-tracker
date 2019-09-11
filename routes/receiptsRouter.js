const express = require('express');
const db = require('../common/helpers');
const router = express.Router();




router.get('/receipts', async (req, res) => {


    try {
        const receipts = await db.getAllRecipts();
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});



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













module.exports = router;