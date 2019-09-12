const express = require('express');
const db = require('../common/helpers');
const authMiddleware = require('../auth/authmiddleware');
const router = express.Router();


router.get('/', authMiddleware ,async (req, res) => {

    try {
        const users = await db.getAllUsers();
        res.status(200).json(users);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const [user] = await db.getUserById(id);
        res.status(200).json(user);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


router.get('/:id/receipts', async (req, res) => {
    const { id } = req.params;
    try {
        const receipts = await db.getAllReceiptsByUser(id);
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

router.get('/:id/filterreceiptsby/:filter/:value', async (req, res) => {
    const { id, filter, value } = req.params;
    try {
        const receipts = await db.filterReceiptsBy(id, filter, value);
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


router.post('user/:id/record_receipt', (req,res)=> {
    // here we need to record a receipt and also add the category for the receipt and also add the picture so we need to do all that

});

router.post('/:id/recordreceiptTest', async (req, res) => {
    const {id} = req.params;
    const receiptData = req.body;
    const receipt = {
        transactionDate: receiptData.transactionDate,
        merchant: receiptData.merchant,
        amountSpent: receiptData.amountSpent
    };

try{ 
 //GET The assocate Category object      
   const [category]= await db.getCategoryByName(receiptData.categoryName); // return the category as object use category.id
   
//ADD the image for the recipt first if it exsists
  //  const file = req.files.photo;
  //  const image = {imageURL: await cloudinaryUpload(file.tempFilePath)}; // returns cloudinary uploaded image result URL
  //  const [addedImage] = await db.addImage(image); // get the id from here addedImage.id

//Now add Receipt 
        const [addedReceipt] =  await db.addReciept(receipt);
        console.log('here is the added receipt', addedReceipt);
     
//now add to receipts to user
        const ur = {
            users_id: id,
            receipts_id: addedReceipt
        };
        await db.addToUsersReceiptsTbl(ur);

// add category to receipt
        const rc = {
            receipts_id: addedReceipt,
            category: category.id
        };
        await db.addToReceiptsCategoryTbl(rc);                    

        res.send(`All clear! We have a receipt by the id of: ${addedReceipt}`);
    }
    catch({message}){
        res.status(500).json({message});
    }
   
});



module.exports = router;