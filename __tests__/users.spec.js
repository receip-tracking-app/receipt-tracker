const request = require('supertest');
const server = require('../api/server');




describe('server.js', () => {
    it('should be in testing Environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });


describe('GET /all users', () => {
        it('should return status 200', async () => {
            const res = await request(server).get('/api/user/users');
            expect(res.status).toBe(200);
        });
});

describe('GET /user by id', () => {
    it('should return status 200', async () => {
        const res = await request(server).get('/api/user/:id');
        expect(res.status).toBe(200);
    });
});

describe('GET/ receipts by id', ()=> {
    it('should return 200', async () => {
        const res = await request(server).get('/api/user/:id/receipts');
        expect(res.status).toBe(200);

    });

    it('should return an array of receipts', async () => {
        const expectedBody = [];
        const res = await request(server).get('/api/user/:id/receipts');      
        expect(res.body).toEqual(expectedBody);
    });

    it('should return an JSON Object', async () => {
        const res = await request(server).get('/api/user/:id/receipts');
        expect(res.type).toEqual('application/json');
    });
});


describe('POST/ add receipt by user id', () => {
    it('should return JSON object', async ()=> {
        const res = await request(server).post('/:id/record_receipt');
        expect(res.body).toEqual({});
    });
});

describe('PUT/ update user', () => {
    it('should return an object', async () => {
        const res = await request(server).put('/updateUser/:id');
        expect(res.body).toEqual({});
    });

    it('should return an object', async () => {
        const res = await request(server).put('/updateUser/:id');
        expect(res.type).toBe("text/html");
    });

    

});





});