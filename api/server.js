// setup express server 

const express = require('express');
const db = require('../common/helpers');


const server = express();

server.use(express.json());



server.get('/users', async (req, res)=>{

    try{
     const users = await db.getAllUsers();     
    res.status(200).json(users);
    }
    catch({message}){
        res.status(500).json(message);
    }
});

server.get('/receipts', async (req, res)=>{
   

    try{
    const receipts = await db.getAllRecipts(); 
    res.status(200).json(receipts);
    }
    catch({message}){
        res.status(500).json(message);
    }
});

server.get('/user/:id', async (req, res)=>{
    const {id} = req.params;
   

    try{
        const user = await db.getUserById(id); 
        res.status(200).json(user);
    }
    catch({message}){
        res.status(500).json(message);
    }
});

server.get('/receipt/:id', async (req, res)=>{
    const {id} = req.params;

    try{
        const receipt = await db.getReceipt(id); 
        res.status(200).json(receipt);
    }
    catch({message}){
        res.status(500).json(message);
    }
});

server.get('/users/:id/receipts', async (req, res)=>{
    const {id} = req.params;
    //console.log('params: ', req.params);
    //console.log('body: ', req.body);
    //console.log('headers:', req.headers);
    try{
        const receipts = await db.getAllReceiptsByUser(id); 
        res.status(200).json(receipts);
    }
    catch({message}){
        res.status(500).json(message);
    }
});


server.get('/users/:id/filterreceiptsby/:filter/:value', async (req, res)=>{
    const {id, filter, value} = req.params;
     console.log('params: ', req.params);
    console.log('body: ', req.body);
    console.log('headers:', req.headers);
 
    try{
        const receipts = await db.filterReceiptsBy(id,filter,value); 
        res.status(200).json(receipts);
    }
    catch({message}){
        res.status(500).json(message);          
    }
});







module.exports = server;
