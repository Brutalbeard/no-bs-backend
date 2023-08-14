import * as express from 'express';
import DailyPlan from '../models/daily-plan-model';

const router = express.Router();

/* GET meal listings. */
router.get('/', async function (req, res, next) {
  await DailyPlan.findAll({
    limit: req.query.limit ? Number(req.query.limit) : Number(process.env.MEAL_DEFAULT_PAGE_SIZE),
    offset: req.query.offset ? Number(req.query.offset) : 0
  })
    .then((dailyPlans) => {
      res
        .status(200)
        .send(dailyPlans);
      next();
    })
    .catch((err) => {
      res
        .status(404)
        .send({ message: err.message });
      next();
    });
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  let dailyPlan = new DailyPlan(req.body);

  dailyPlan
    .save()
    .then((dailyPlan) => {
      res
        .status(200)
        .send(dailyPlan);
      next();
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message });
      next();
    });
});

router.put('/:id', async function (req, res, next) {
  DailyPlan
    .findByPk(req.params.id)
    .then((dailyPlan) => {
      if (dailyPlan) {
        dailyPlan
          .update(req.body)
          .then((dailyPlan) => {
            res
              .status(200)
              .send(dailyPlan);
            next();
          })
          .catch((err) => {
            res
              .status(400)
              .send({ message: err.message });
            next();
          });
      } else {
        res
          .status(404)
          .send({ message: 'Daily Plan not found' });
        next();
      }
    });
});


export default router; 