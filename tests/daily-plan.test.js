const request = require('supertest');
const bodyParser = require('body-parser');
const router = require('../dist/routes/daily-plan-router').default;
const app = require('../dist/app').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

let testId = 0;

describe('/POST Daily Plan', () => {
    test('should return 400', done =>{
        request(app)
            .post('/')
            .then((response) => {
                expect(response.statusCode).toEqual(400);
                done();
            });
    });
    test('should return 200', done =>{
        request(app)
            .post('/')
            .send({
                "date": "2023-08-15",
                "gratitude": "I am grateful for my family",
                "todayMyWhyIs": "I want to be a better person",
                "focus": "I will focus on my health",
                "obstacle": "I will not let my emotions get the best of me",
                "overcome": "I will overcome my emotions by taking a deep breath and thinking about the situation"
            })
            .then((response) => {
                testId = response.body.id;
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 400', done =>{
        request(app)
            .post('/')
            .send({
                "date": null,
                "gratitude": "I am grateful for my family",
                "todayMyWhyIs": "I want to be a better person",
                "focus": "I will focus on my health",
                "obstacle": "I will not let my emotions get the best of me",
                "overcome": "I will overcome my emotions by taking a deep breath and thinking about the situation"
            })
            .then((response) => {
                expect(response.statusCode).toEqual(400);
                done();
            });
    });
});


describe('/GET Daily Plan', () => {
    test('should return 200', done =>{
        request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 200', done =>{
        request(app)
            .get(`/?limit=1`)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 200', done =>{
        request(app)
            .get(`/?offset=1`)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 404', done =>{
        request(app)
            .get('/random')
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
    });
    test('should return an array', done =>{
        request(app)
            .get('/?limit=1')
            .then((response) => {
                expect(response.body).toEqual(expect.any(Array));
                done();
            });
    });
    test('should return an object', done =>{
        request(app)
            .get(`/${testId}`)
            .then((response) => {
                expect(response.body).toEqual(expect.any(Object));
                done();
            });
        });
    test('string id should fail', done =>{
        request(app)
            .get(`/random`)
            .then((response) => {
                expect(response.body).toEqual(expect.any(Object));
                done();
            });
        });
    test('string id should fail', done =>{
        request(app)
            .get(`/random`)
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
        });
    test('bad id should fail', done =>{
        request(app)
            .get(`/80000`)
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
        });
});

describe('/PUT Daily Plan', () => {
    test('should return 200', done =>{
        request(app)
            .put(`/${testId}`)
            .send({
                focus: "Something else to focus on"
            })
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 400', done =>{
        request(app)
            .put(`/80000`)
            .send({
                focus: null
            })
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
    });
});

describe('/DELETE Daily Plan', () => {
    test('should return 200', done =>{
        request(app)
            .delete(`/${testId}`)
            .then((response) => {
                expect(response.statusCode).toEqual(201);
                done();
            });
    });
    test('should return 400', done =>{
        request(app)
            .delete(`/80000`)
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
    });
});
