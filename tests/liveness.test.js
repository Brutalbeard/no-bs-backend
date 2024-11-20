const request = require('supertest');
const app = require('../dist/app').default;

describe('Liveness Endpoint', () => {
    it('should return 400 because too soon', async () => {
        const response = await request(app.callback()).get('/api/v1/liveness');
        expect(response.status).toBe(500);
    });
    // await a bit
    it('should return 200', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await request(app.callback()).get('/api/v1/liveness');
        expect(response.status).toBe(200);
    });
});

afterAll((done) => {
    process.emit('SIGINT');
    done();
});