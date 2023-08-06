const request = require('supertest');
const express = require('express');
const router = require('../dist/routes/meal-router').default;
const bodyParser = require("body-parser");

const app = new express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/meal', router);

describe('GET /meal', () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/meal")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('POST /meal', () => {
    test("It should response the GET method", done => {
        request(app)
            .post("/meal")
            .send({
                "date": Date.now(),
                "actual": "Woohoo",
                "onPlan": true,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "Snack"
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });
});