import * as express from 'express';
import Meal from '../models/meal-model';

const router = express.Router();

/* GET meal listings. */
router.get('/', async function (req, res, next) {
  let records = await Meal.findAll({
    limit: Number(req.query.limit) ? Number(req.query.limit) : Number(process.env.MEAL_DEFAULT_PAGE_SIZE),
    offset: Number(req.query.offset) ? Number(req.query.offset) : 0
  });
  res
    .status(200)
    .send(records);
  next();
});


/* GET meal by id. */
router.get('/:id', async function (req, res, next) {
  await Meal
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
          .send('Not found');
        next();
      }
    });
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  let meal = new Meal(req.body);

  await meal
    .validate()
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message });
      next();
    })

  meal
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
    })
});

// a route that updates data on the server
router.put('/:id', async function (req, res, next) {
  await Meal
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
          .send('Not found');
        next();
      }
    });
});

// a route that deletes data on the server
router.delete('/:id', async function (req, res, next) {
  await Meal
    .findByPk(req.params.id)
    .then((meal) => {
      if (meal) {
        meal
          .destroy()
          .then((meal) => {
            res
              .status(201)
              .send('Deleted');
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
          .send('Not found');
        next();
      }
    });
});

export default router;