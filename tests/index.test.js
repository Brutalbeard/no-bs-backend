const request = require('supertest');
const app = require('../dist/app').default;


describe('GET /', () => {
    test('should return 200 OK', async () => {
        const res = await request(app.callback()).get('/api/v1/');
        expect(res.status).toEqual(200);
    });
    test('should return 404 Not Found', async () => {
        const res = await request(app.callback()).get('/api/v1/random');
        expect(res.statusCode).toEqual(404);
    });
})