import * as express from 'express';
import DailyPlan from '../models/daily-plan-model';

const router = express.Router();

// a route that posts data to the server
router.post('/', function (req, res, next) {
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

/* GET meal listings. */
router.get('/', function (req, res, next) {
  DailyPlan.findAll({
    limit: req.query.limit ? Number(req.query.limit) : 50,
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

router.get('/:id', function (req, res, next) {
  DailyPlan
    .findByPk(req.params.id)
    .then((dailyPlan) => {
      if (dailyPlan) {
        res
          .status(200)
          .send(dailyPlan);
        next();
      } else {
        res
          .status(404)
          .send({ message: 'Daily Plan not found' });
        next();
      }
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message });
      next();
    });
});

router.put('/:id', function (req, res, next) {
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