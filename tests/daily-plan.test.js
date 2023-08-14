const request = require('supertest');
const express = require('express');
const { describe } = require('node:test');
const e = require('express');
const router = require('../dist/routes/daily-plan-router').default;

const app = new express();
app.use('/', router);

describe('/GET Daily Plan', () => {
    it('should return 200', async () => {
        await request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toEqual(200);
            })
            .catch((err) => {
                console.error(err);
            });
    });
    it('should return 404', async () => {
        await request(app)
            .get('/random')
            .then((response) => {
                expect(response.statusCode).toEqual(404);
            })
            .catch((err) => {
                console.error(err);
            });
    });
});