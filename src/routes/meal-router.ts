import * as express from 'express';
import Meal from '../models/meal-model';

const router = express.Router();

/* GET meal listings. */
router.get('/', function (req, res, next) {
  Meal.findAll({
    limit: req.query.limit ? Number(req.query.limit) : 50,
    offset: req.query.offset ? Number(req.query.offset) : 0
  })
    .then((meals: Meal[]) => {
      res
        .status(200)
        .send(meals);
      next();
    })
    .catch((err: Error) => {
      res
        .status(404)
        .send({ message: err.message});
      next();
    });
});


/* GET meal by id. */
router.get('/:id', function (req, res, next) {
  Meal
    .findByPk(req.params.id)
    .then((meal) => {
      if (meal) {
        res
          .status(200)
          .send(meal);
        next();
      } else {
        res
          .status(404)
          .send({ message: 'Not found' });
        next();
      }
    });
});

// a route that posts data to the server
router.post('/', function (req, res, next) {
  new Meal(req.body)
    .save()
    .then((meal) => {
      res
        .status(200)
        .send(meal);
      next();
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message });
      next();
    });
});

// a route that updates data on the server
router.put('/:id', function (req, res, next) {
  Meal
    .findByPk(req.params.id)
    .then((meal) => {
      if (meal) {
        meal
          .update(req.body)
          .then((meal) => {
            res
              .status(200)
              .send(meal);
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

// a route that deletes data on the server
router.delete('/:id', function (req, res, next) {
  Meal
    .findByPk(req.params.id)
    .then((meal) => {
      meal
        .destroy()
        .then(() => {
          res
            .status(201)
            .send({message: 'Deleted'});
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