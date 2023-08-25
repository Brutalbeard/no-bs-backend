const request = require('supertest');
const bodyParser = require('body-parser');
const router = require('../dist/routes/weekly-plan-router').default;
const app = require('../dist/app').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

let testId = 0;

describe('/POST Weekly Plan', () => {
    it('should return 200', (done) => {
        request(app)
            .post('/')
            .send({
                date: new Date(),
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
                obstacles: "none",
            })
            .then((response) => {
                testId = response.body.id;
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    it('should return 400', (done) => {
        request(app)
            .post('/')
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
        request(app)
            .get(`/${testId}`)
            .expect(200, done);
    });
    it('should return 404', (done) => {
        request(app)
            .get('/99999999999')
            .expect(404, done);
    });
    it('should return 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
    it('should return 200', (done) => {
        request(app)
            .get('/?offset=1')
            .expect(200, done);
    });
    it('should return 200', (done) => {
        request(app)
            .get('/?limit=2')
            .expect(200, done);
    });
});

describe('/PUT Weekly Plan', () => {
    it('should return 200', (done) => {
        request(app)
            .put(`/${testId}`)
            .send({
                date: new Date(),
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
                obstacles: "none",
            })
            .expect(200, done);
    });
    it('should return 400', (done) => {
        request(app)
            .put(`/${testId}`)
            .send({
                date: null,
                poundsToLose: 2,
                goalsOutsideScale: "be awesome",
            })
            .expect(400, done);
    });
    it('should return 404', (done) => {
        request(app)
            .put(`/99999999`)
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
        request(app)
            .delete(`/${testId}`)
            .expect(201, done);
    });
    it('should return 404', (done) => {
        request(app)
            .delete(`/99999999`)
            .expect(404, done);
    });
});