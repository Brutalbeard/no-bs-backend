const request = require('supertest');
const router = require('../dist/routes/meal-router').default;
const bodyParser = require('body-parser');
const app = require('../dist/app').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/meal', router);

let createdMealId = 0;

describe('POST /meal', () => {
    test("It should create a new meal record", done => {
        request(app)
            .post('/meal')
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
            .catch(err => {
                console.log(err);
                done();
            });
    });
    test("It should fail to create a new meal record", done => {
        request(app)
            .post('/meal')
            .send({
                "date": new Date(),
                "actual": "Woohoo",
                "onPlan": true,
                "hungriness": "medium",
                "satisfaction": "minimal",
                "mealType": "Snack"
            })
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });
});

describe('GET /meal', () => {
    test("It should respond with a 200", done => {
        request(app)
            .get('/meal')
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

describe('GET /meal by id', () => {
    test("It should return a specific meal", done => {
        request(app)
            .get('/meal/' + createdMealId)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should fail to return a specific meal", done => {
        request(app)
            .get('/meal/' + 80000)
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
});

describe('PUT /meal by id', () => {
    test("It should update a specific meal", done => {
        request(app)
            .put('/meal/' + createdMealId)
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
        request(app)
            .put('/meal/' + createdMealId)
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
        request(app)
            .put('/meal/' + 80000)
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
});

describe('DELETE /meal by id', () => {
    test("It should delete a specific meal", done => {
        request(app)
            .delete('/meal/' + createdMealId)
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });
    test("It should fail to delete a specific meal", done => {
        request(app)
            .delete('/meal/' + 80000)
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
});