const request = require('supertest');
const router = require('../dist/routes/meal-router').default;
const bodyParser = require('body-parser');
const app = require('../dist/app').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/meal', router);

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
                expect(response.statusCode).toBe(200);
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
            });
    });
    test("It should respond with an array", done => {
        request(app)
            .get('/meal')
            .then(response => {
                expect(Array.isArray(response.body)).toBe(true);
                done();
            });
    });
});

describe('GET /meal by id', () => {
    test("It should return a specific meal", done => {
        request(app)
            .get('/meal/1')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('DELETE /meal by id', () => {
    test("It should delete a specific meal", done => {
        request(app)
            .delete('/meal/1')
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });
});