// setup express server 

const express = require('express');
const db = require('../common/helpers');
const fileUpload = require('express-fileupload'); // need this lib to make cloudinary work
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dbqzzps1w',
    api_key: '285366672342837',
    api_secret: 'i82ZeJdEll8AypNAE7brgVDuOj4'
});

const server = express();

server.use(express.json());
server.use(fileUpload({
    useTempFiles: true // we need this create a temp directory to hold onto uploaded files available via express-fileupload
}));


server.get('/users', async (req, res) => {

    try {
        const users = await db.getAllUsers();
        res.status(200).json(users);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/categories', async (req, res) => {
    try{
        const categories = await db.getAllCategories();
        res.status(200).json(categories)
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/category/:name', async (req,res) => { // DELETE ME!!! I was just around for testing purposes
    const {name} = req.params;
    try{
        const [{id}] = await db.getCategoryByName(name);
        res.status(200).json(id);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/receipts', async (req, res) => {


    try {
        const receipts = await db.getAllRecipts();
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/user/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const user = await db.getUserById(id);
        res.status(200).json(user);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/receipt/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const receipt = await db.getReceipt(id);
        res.status(200).json(receipt);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/user/:id/receipts', async (req, res) => {
    const { id } = req.params;
    try {
        const receipts = await db.getAllReceiptsByUser(id);
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


server.get('/users/:id/filterreceiptsby/:filter/:value', async (req, res) => {
    const { id, filter, value } = req.params;
    try {
        const receipts = await db.filterReceiptsBy(id, filter, value);
        res.status(200).json(receipts);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.get('/images', async (req, res)=> {
    try{
        const images = await db.getRImages();
         res.status(200).json(images) ;
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

// POST REQUESTS
server.post('/register', async (req, res) => {
    const user = req.body;
    try {
        const newUser = await db.addUser(user);
        res.status(201).json(newUser);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


server.post('/upload', async (req, res) => {
    // push saved image to cloudinary API
    //  console.log(req.files); // this 'files' field was not added by default express, express-fileupload lib give this functionality
    const file = req.files.photo;
    //console.log(file)
    try {
        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: `there was an error: ${err}`
                });
            }
            else {
                res.status(201).json({
                    success: true,
                    result // returns an object from cloudinary that allows us to grab a ref URL (result.url) as text of out link that we can can store for the receipts picture.
                });
            }
        });
    }
    catch ({ message }) {
        res.send(500).json(message);
    }
    // file.mv("./uploads/"+file.name, (err, result) => { // this file.mv || file.move method is a express-fileupload function that lets up caputre the uploaded file and move it into a designated folder. Notice the req.files.photo const we made called file. I reason that the photo is not a particular file format that is known to the server rather the key we desinated in the bod in postman when we upload the image in the body
    //         if(err){
    //             throw err;
    //         }
    //             res.status(201).json({
    //                 success: true,
    //                 message: 'File Uploaded'
    //       });

    // });


});


server.post('/createCategory', async (req,res) => {
    const newCategory = req.body;
    try{
        const record = await db.addCategory(newCategory);
        res.status(201).json({message: `The category ${newCategory.categoryName} was added successfully.`})
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});

server.post('user/:id/record_receipt', (req,res)=> {
    // here we need to record a receipt and also add the category for the receipt and also add the picture so we need to do all that

});


const cloudinaryUpload = async (fileToUpload) => {
    var cloudinaryResult = {};
        try {
         if(fileToUpload){
             await cloudinary.uploader.upload(fileToUpload, (error, results) => {
                    if(error){
                        console.log(error);
                    }else{
                        //console.log(results)
                        cloudinaryResult = results;
                    }
            });
         }
        }catch(err){
            console.log(err);
        }
        return cloudinaryResult.url; 
};



server.post('/imageupload', async (req, res) => {
    const file = req.files.photo;
   
    const photoURL = {imageURL: await cloudinaryUpload(file.tempFilePath)}; // returns cloudinary uploaded image result URL
    try{
        const id = await db.addImage(photoURL);
        res.status(201).json(id);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


server.post('/user/:id/recordreceiptTest', async (req, res) => {
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



module.exports = server;
