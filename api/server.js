// setup express server 

const express = require('express');
const db = require('../common/helpers');
const fileUpload = require('express-fileupload'); // need this lib to make cloudinary work
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const categoryRouter = require('../routes/categoryRouter');
const receiptsRouter = require('../routes/receiptsRouter');
const userRouter = require('../routes/userRouter');
const registerRouter = require('../routes/authRouter');

cloudinary.config({
    cloud_name: 'dbqzzps1w',
    api_key: '285366672342837',
    api_secret: 'i82ZeJdEll8AypNAE7brgVDuOj4'
});

const server = express();

server.use(express.json());
server.use(cors());
server.use(fileUpload({
    useTempFiles: true // we need this create a temp directory to hold onto uploaded files available via express-fileupload
}));
server.use('/api/user', userRouter);
server.use('/api/category', categoryRouter);
server.use('/api/receipt', receiptsRouter);
server.use('/api/auth', registerRouter);


server.get('/images', async (req, res)=> {
    try{
        const images = await db.getRImages();
         res.status(200).json(images) ;
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






module.exports = server;
