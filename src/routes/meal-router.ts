import * as express from 'express';
import Meal from '../models/meal-model';
const router = express.Router();

/* GET meal listings. */
router.get('/', async function (req, res, next) {
  let records = await Meal.findAll({
    limit: Number(req.query.limit) ? Number(req.query.limit) : Number(process.env.MEAL_DEFAULT_PAGE_SIZE)
  });
  res.status(200).send(records);
});


/* GET meal by id. */
router.get('/:id', async function (req, res, next) {
  await Meal
    .findByPk(req.params.id)
    .then((meal) => {
      if (meal) {
        res.status(200).send(meal);
      } else {
        res.status(404).send('Not found');
      }
    });
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  let meal = new Meal(req.body);

  await meal.validate()
    .catch((err) => {
      res.status(400).send(err);
      next();
    })

  meal.save()
    .then((meal) => {
      res.status(200).send(meal);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

export default router;