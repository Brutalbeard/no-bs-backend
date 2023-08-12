const request = require('supertest');
const express = require('express');
const router = require('../dist/routes/index').default;

const app = new express();
app.use('/', router);

describe('GET /', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
})