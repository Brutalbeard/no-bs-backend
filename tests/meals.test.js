const request = require('supertest');
const express = require('express');
const router = require('../dist/routes/meal-router').default;

const app = new express();

app.use('/meal', router);

describe('GET /meal', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/meal');
        expect(res.statusCode).toEqual(200);
    });
});

describe('POST /meal', () => {
    it('should return 200 OK', async () => {
        const res = (await request(app)
            .post('/meal')
            .send({
                "date": "2023-08-05T23:42:19.329Z",
                "actual": "Woohoo",
                "onPlan": true,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "Snack"
            })
        );
        expect(res.statusCode).toEqual(200);
    });
});