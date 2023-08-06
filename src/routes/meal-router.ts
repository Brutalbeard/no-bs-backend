import * as express from 'express';
import Meal from '../models/meal-model';
const router = express.Router();

/* GET deep dives listings. */
router.get('/', function (req, res, next) {
  res.send('you\'ve reached the deep dive route  ');
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  let meal = new Meal(req.body)

  await meal.validate()
  // .catch((err) => {
  //   res.status(400).send(err)
  // })

  meal.save()
    .then((meal) => {
      res.status(200).send(meal)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
});

export default router;