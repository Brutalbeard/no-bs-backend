const request = require('supertest');
const Koa = require('koa');
const router = require('../dist/routes/readiness').default;

const app = new Koa();
app.use(router.routes()).use(router.allowedMethods());

describe('Readiness Endpoint', () => {
    it('should return 200 OK', async () => {
        const response = await request(app.callback()).get('/api/v1/readiness');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'OK' });
    });
});