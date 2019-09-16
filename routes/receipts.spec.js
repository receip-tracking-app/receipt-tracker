const request = require('supertest');
const server = require('../api/server');




describe('Receipts Router Test Suite', () => {

    describe('GET /receipts', () => {
        it('should return an array of receipts', async ()=> {
            const res = await request(server).get('/api/receipt/receipts');
            expect(res.body).toEqual([]);
        });
    });


    describe('GET /:id', () => {
        it('should return an array of receipts', async ()=> {
            const res = await request(server).get('/api/receipt/receipts/:id');
            expect(res.type).toEqual('text/html');
        });
    });

    describe('Put /updateReceipt/:id', () => {
        it('should return an empty object', async ()=> {
            const res = await request(server).put('/api/receipt/updateReceipt/:id');
            expect(res.type).toEqual('application/json');
        });
    });


    describe('Delete /updateReceipt/:id', () => {
        it('should return a status 200', async ()=> {
            const res = await request(server).delete('/api/receipt/removeReceipt/:id');
            expect(res.body).toEqual({"message": "The receipt was successfully removed"});
        });
    });



});