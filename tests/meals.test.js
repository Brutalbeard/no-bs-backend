const request = require('supertest');
const bodyParser = require('body-parser');
const router = require('../dist/routes/meal-router').default;
const app = require('../dist/app').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

let createdMealId = 0;

describe('POST /', () => {
    test("It should create a new meal record", done => {
        request(app)
            .post('/')
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
        request(app)
            .post('/')
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
        request(app)
            .get('/')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should respond with an array", done => {
        request(app)
            .get('/?limit=2')
            .then(response => {
                expect(response.body.length).toBe(2);
                done();
            });
    });
    test("It should respond with an error", done => {
        request(app)
            .get('/?limit=BEANS')
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
    test("It should work with an offset", done => {
        request(app)
            .get('/?offset=1')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('GET /meal by id', () => {
    test("It should return a specific meal", done => {
        request(app)
            .get('/' + createdMealId)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should fail to return a specific meal", done => {
        request(app)
            .get('/' + 80000)
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
});

describe('PUT /meal by id', () => {
    test("It should update a specific meal", done => {
        request(app)
            .put('/' + createdMealId)
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
            .put('/' + createdMealId)
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
            .put('/' + 80000)
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
            .delete('/' + createdMealId)
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });
    test("It should fail to delete a specific meal", done => {
        request(app)
            .delete('/stupid-face')
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
});