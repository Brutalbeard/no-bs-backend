const request = require('supertest');
const express = require('express');
const router = require('../dist/routes/daily-plan-router').default;

const app = new express();
app.use('/', router);

let testId = 0;

describe('/GET Daily Plan', () => {
    test('should return 200', async () => {
        await request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toEqual(200);
            });
    });
    test('should return 404', async () => {
        await request(app)
            .get('/random')
            .then((response) => {
                expect(response.statusCode).toEqual(404);
            });
    });
    test('should return an array', async () => {
        await request(app)
            .get('/?limit=1')
            .then((response) => {
                expect(response.body).toEqual(expect.any(Array));
            });
    });
});

describe('/POST Daily Plan', () => {
    test('should return 400', async () => {
        await request(app)
            .post('/')
            .then((response) => {
                expect(response.statusCode).toEqual(400);
            });
    });
    test('should return 200', async () => {
        await request(app)
            .post('/')
            .send({
                date: Date.now(),
                gratitude: "I am grateful for my family",
                todayMyWhyIs: "I want to be a better person",
                focus: "I will focus on my health",
                obstacle: "I will not let my emotions get the best of me",
                overcome: "I will overcome my emotions by taking a deep breath and thinking about the situation"
            })
            .then((response) => {
                testId = response.id;
                expect(response.statusCode).toEqual(200);
            });
    });
});

describe('/PUT Daily Plan', () => {
    test('should return 200', async () => {
        await request(app)
            .put(`/${testId}`)
            .send({
                focus: "Something else to focus on"
            })
            .then((response) => {
                expect(response.statusCode).toEqual(200);
            });
    });
});
