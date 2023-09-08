const request = require('supertest');
const app = require('../dist/app').default;

let createdMealId = 0;

describe('POST /', () => {
    test("It should create a new meal record", done => {
        request(app.callback())
            .post('/api/v1/meal')
            .send({
                "date": new Date(),
                "actual": "Woohoo",
                "onPlan": true,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "Snack"
            })
            .then(response => {
                createdMealId = response.body.id;
                expect(response.statusCode).toBe(200);
                done();
            })
    });
    test("It should fail to create a new meal record", done => {
        request(app.callback())
            .post('/api/v1/meal')
            .send({
                "date": new Date(),
                "actual": "Woohoo",
                "onPlan": true,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "JUNKFOOD"
            })
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            })
    });
});

describe('GET /meal', () => {
    test("It should respond with a 200", done => {
        request(app.callback())
            .get('/api/v1/meal')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should respond with an array", done => {
        request(app.callback())
            .get('/api/v1/meal?limit=1')
            .then(response => {
                expect(response.body.length).toBe(1);
                done();
            });
    });
    test("It should respond with an error", done => {
        request(app.callback())
            .get('/api/v1/meal?limit=BEANS')
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });
    test("It should work with an offset", done => {
        request(app.callback())
            .get('/api/v1/meal?offset=1')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('GET /meal by id', () => {
    test("It should return a specific meal", done => {
        request(app.callback())
            .get('/api/v1/meal/' + createdMealId)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should fail to return a specific meal", done => {
        request(app.callback())
            .get('/api/v1/meal/' + 80000)
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
});

describe('PUT /meal by id', () => {
    test("It should update a specific meal", done => {
        request(app.callback())
            .put('/api/v1/meal/' + createdMealId)
            .send({
                "date": new Date(),
                "actual": "Woohoo",
                "onPlan": false,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "Snack"
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should fail to update a specific meal", done => {
        request(app.callback())
            .put('/api/v1/meal/' + createdMealId)
            .send({
                "date": new Date(),
                "actual": "Woohoo",
                "onPlan": false,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "POOP"
            })
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    test("It should fail to update a specific meal", done => {
        request(app.callback())
            .put('/api/v1/meal/' + 80000)
            .send({
                "date": new Date(),
                "actual": "Woohoo",
                "onPlan": false,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "POOP"
            })
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    test("It should fail to update a specific meal", done => {
        request(app.callback())
            .put('/api/v1/meal/RANDOM')
            .send({
                "date": new Date(),
            })
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
});

describe('DELETE /meal by id', () => {
    test("It should delete a specific meal", done => {
        request(app.callback())
            .delete('/api/v1/meal/' + createdMealId)
            .then(response => {
                expect(response.statusCode).toBe(204);
                done();
            });
    });
    test("It should fail to delete a specific meal", done => {
        request(app.callback())
            .delete('/api/v1/meal/stupid-face')
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
});