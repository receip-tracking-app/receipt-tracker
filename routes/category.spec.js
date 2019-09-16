const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');


describe('/Category Testing Suite', ()=> {

    beforeEach(async () => {
        await db('category').truncate();
    });

     
describe('/Get /categories', () => {
    it('should return an array of categories', async () => {
        const res = await request(server).get('/api/category/categories');
        expect(res.body).toEqual([]);
    });
}); 

describe('/Get /:name', () => {
    it('should return a catery id', async () => {
        const res = await request(server).get('/api/category/name');
        expect(res.status).toBe(500);
    });
});

describe("/Post /createCategory", () => {
    it('should create a new category', async () => {
        const res = await request(server).post('/api/category/createCategory');
        expect(res.body).toEqual( {"message": "The category undefined was added successfully."});
    });
});

describe('/Put /updateCategory/:id', () => {
    it('should update and return a message', async () => {
        const res = await request(server).put('/api/category/updateCategory/:id');
         expect(res.type).toBe('application/json');
    });
});

describe('/Delete /removeCategory/:id', () => {
    it('should delete the category', async () => {
        const res = await request(server).delete('/api/category/removeCategory/:id');
        expect(res.body).toEqual({"message": "The category was successfully deleted"});
    });
});

});