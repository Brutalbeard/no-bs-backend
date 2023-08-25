import * as express from 'express';
import DailyPlan from '../models/daily-plan-model';

const router = express.Router();

/* GET deep dives listings. */
router.get('/', function(req, res, next) {
  DailyPlan.findAll({
    limit: req.query.limit ? Number(req.query.limit) : 50,
    offset: req.query.offset ? Number(req.query.offset) : 0
  })
    .then((plans: DailyPlan[]) => {
      res
        .status(200)
        .send(plans);
      next();
    })
    .catch((err: Error) => {
      res
        .status(404)
        .send({ message: err.message});
      next();
    });
});

router.get('/:id', function(req, res, next) {
  DailyPlan
    .findByPk(req.params.id)
    .then((plan) => {
      if (plan) {
        res
          .status(200)
          .send(plan);
        next();
      } else {
        res
          .status(404)
          .send({ message: 'Not found' });
        next();
      }
    });
});

router.post('/', function(req, res, next) {
  let plan = new DailyPlan(req.body);

  plan
    .save()
    .then((plan) => {
      res
        .status(200)
        .send(plan);
      next();
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message });
      next();
    });
});

router.put('/:id', function(req, res, next) {
  DailyPlan
    .findByPk(req.params.id)
    .then((plan) => {
      if (plan) {
        plan
          .update(req.body)
          .then((plan) => {
            res
              .status(200)
              .send(plan);
            next();
          })
          .catch((err) => {
            res
              .status(400)
              .send({ message: err.message });
            next();
          })
      } else {
        res
          .status(404)
          .send({ message: 'Not found' });
        next();
      }
    });
});

router.delete('/:id', function(req, res, next) {
  DailyPlan
    .findByPk(req.params.id)
    .then((plan) => {
      plan.destroy()
        .then(() => {
          res
            .status(201)
            .send(plan);
          next();
        })
        .catch((err) => {
          res
            .status(400)
            .send({ message: err.message });
          next();
        })
    })
    .catch((err) => {
      res
        .status(404)
        .send({ message: err.message });
      next();
    });
});

export default router;