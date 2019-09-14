const request = require('supertest');
const server = require('../api/server');
const userRouter = require('../routes/userRouter');



describe('server.js', () => {
    it('should be in testing Environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});


describe('GET /users', () => {
        it('should return status 200', async () => {
            const res = await request(server).get('/api/user/users');
            expect(res.status).toBe(200);
        });
});

describe('GET / User by id', () => {
    it('should return status 200', async () => {
        const res = await request(server).get('/api/user/:id');
        expect(res.status).toBe(200);
    });
});

