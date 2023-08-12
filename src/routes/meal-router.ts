import * as express from 'express';
import Meal from '../models/meal-model';

const router = express.Router();

/* GET meal listings. */
router.get('/', async function (req, res, next) {
  await Meal.findAll({
    limit: req.query.limit ? Number(req.query.limit) : Number(process.env.MEAL_DEFAULT_PAGE_SIZE),
    offset: req.query.offset ? Number(req.query.offset) : 0
  })
    .then((meals) => {
      res
        .status(200)
        .send(meals);
      next();
    })
    .catch((err) => {
      res
        .status(404)
        .send({ message: 'Not found' });
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
router.post('/', async function (req, res, next) {
  let meal = new Meal(req.body);

  console.log(meal)

  await meal
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
router.delete('/:id', async function (req, res, next) {
  let meal = await Meal
    .findByPk(req.params.id)
    .catch((err) => {
      res
        .status(404)
        .send({ message: err.message });
    });

  console.log(meal);

  if (meal) {
    meal
      .destroy()
      .then((meal) => {
        res
          .status(201)
          .send('Deleted');
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: err.message });
      })
  } else {
    res
      .status(404)
      .send({ message: 'Not found' });
  }
});

export default router;