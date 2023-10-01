const request = require('supertest');
const app = require('../dist/app').default;

let testId = 0;

describe('/POST Daily Plan', () => {
    test('should return 400', done =>{
        request(app.callback())
            .post('/api/v1/daily-plan/')
            .then((response) => {
                expect(response.statusCode).toEqual(400);
                done();
            });
    });
    test('should return 200', done =>{
        request(app.callback())
            .post('/api/v1/daily-plan/')
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
        request(app.callback())
            .post('/api/v1/daily-plan/')
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
        request(app.callback())
            .get('/api/v1/daily-plan/')
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 200', done =>{
        request(app.callback())
            .get(`/api/v1/daily-plan/?limit=1`)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 200', done =>{
        request(app.callback())
            .get(`/api/v1/daily-plan/?offset=1`)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 404', done =>{
        request(app.callback())
            .get('/api/v1/daily-plan/random')
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
    });
    test('should return an array', done =>{
        request(app.callback())
            .get('/api/v1/daily-plan/?limit=1')
            .then((response) => {
                expect(response.body).toEqual(expect.any(Array));
                done();
            });
    });
    test('should return an object', done =>{
        request(app.callback())
            .get(`/api/v1/daily-plan/${testId}`)
            .then((response) => {
                expect(response.body).toEqual(expect.any(Object));
                done();
            });
        });
    test('string id should fail', done =>{
        request(app.callback())
            .get(`/api/v1/daily-plan/random`)
            .then((response) => {
                expect(response.body).toEqual(expect.any(Object));
                done();
            });
        });
    test('string id should fail', done =>{
        request(app.callback())
            .get(`/api/v1/daily-plan/random`)
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
        });
    test('bad id should fail', done =>{
        request(app.callback())
            .get(`/api/v1/daily-plan/80000`)
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
        });
});

describe('/PUT Daily Plan', () => {
    test('should return 200', done =>{
        request(app.callback())
            .put(`/api/v1/daily-plan/${testId}`)
            .send({
                focus: "Something else to focus on"
            })
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
    test('should return 400', done =>{
        request(app.callback())
            .put(`/api/v1/daily-plan/80000`)
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
        request(app.callback())
            .delete(`/api/v1/daily-plan/${testId}`)
            .then((response) => {
                expect(response.statusCode).toEqual(204);
                done();
            });
    });
    test('should return 400', done =>{
        request(app.callback())
            .delete(`/api/v1/daily-plan/80000`)
            .then((response) => {
                expect(response.statusCode).toEqual(404);
                done();
            });
    });
});

afterAll((done) => {
    process.emit('SIGINT');
    done();
});