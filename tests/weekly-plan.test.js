const request = require('supertest');
const app = require('../dist/app').default;

let testId = 0;

describe('/POST Weekly Plan', () => {
    it('should return 200', (done) => {
        request(app.callback())
            .post('/api/v1/weekly-plan/')
            .send({
                date: new Date(),
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
                obstacles: "none",
                differentThisWeek: "none",
            })
            .then((response) => {
                testId = response.body.id;
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    it('should return 400', (done) => {
        request(app.callback())
            .post('/api/v1/weekly-plan/')
            .send({
                date: null,
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
            })
            .then((response) => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });
});

describe('/GET Weekly Plan', () => {
    it('should return 200', (done) => {
        request(app.callback())
            .get(`/api/v1/weekly-plan/${testId}`)
            .expect(200, done);
    });
    it('should return 404', (done) => {
        request(app.callback())
            .get('/api/v1/weekly-plan/99999999999')
            .expect(404, done);
    });
    it('should return 200', (done) => {
        request(app.callback())
            .get('/api/v1/weekly-plan/')
            .expect(200, done);
    });
    it('should return 200', (done) => {
        request(app.callback())
            .get('/api/v1/weekly-plan/?offset=1')
            .expect(200, done);
    });
    it('should return 200', (done) => {
        request(app.callback())
            .get('/api/v1/weekly-plan/?limit=2')
            .expect(200, done);
    });
    it('should return 200', (done) => {
        request(app.callback())
            .get('/api/v1/weekly-plan/?include=weekly-assessment')
            .expect(200, done);
    });
});

describe('/PUT Weekly Plan', () => {
    it('should return 200', (done) => {
        request(app.callback())
            .put(`/api/v1/weekly-plan/${testId}`)
            .send({
                date: new Date(),
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
                obstacles: "none",
            })
            .expect(200, done);
    });
    it('should return 400', (done) => {
        request(app.callback())
            .put(`/api/v1/weekly-plan/${testId}`)
            .send({
                date: null,
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
            })
            .expect(400, done);
    });
    it('should return 404', (done) => {
        request(app.callback())
            .put(`/api/v1/weekly-plan/99999999`)
            .send({
                date: null,
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
            })
            .expect(404, done);
    });
});

describe('/DELETE Weekly Plan', () => {
    it('should return 200', (done) => {
        request(app.callback())
            .delete(`/api/v1/weekly-plan/${testId}`)
            .expect(204, done);
    });
    it('should return 404', (done) => {
        request(app.callback())
            .delete(`/api/v1/weekly-plan/99999999`)
            .expect(404, done);
    });
});

afterAll((done) => {
    process.emit('SIGINT');
    done();
});