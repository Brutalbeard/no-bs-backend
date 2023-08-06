import * as express from 'express';
import Meal from '../models/meal-model';
const router = express.Router();

/* GET meal listings. */
router.get('/', async function (req, res, next) {
  let records = await Meal.findAll({
    limit: 50 | Number(req.query.limit)
  });
  res.status(200).send(records);
});


/* GET meal by id. */
router.get('/:id', async function (req, res, next) {
  let records = await Meal.findByPk(req.params.id);
  res.status(200).send(records);
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  let meal = new Meal(req.body)

  await meal.validate()
    .catch((err) => {
      res.status(400).send(err)
    })

  meal.save()
    .then((meal) => {
      res.status(200).send(meal)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
});

export default router;