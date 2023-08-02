import * as express from 'express';
import DailyPlan from '../models/daily-plan-model';
const router = express.Router();

/* GET deep dives listings. */
router.get('/', function (req, res, next) {
  res.send('you\'ve reached the deep dive route  ');
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  let dailyPlan = new DailyPlan(req.body);

  dailyPlan.validate()
    .then(() => {
      dailyPlan.save()
        .then((dailyPlan) => {
          res.status(200).send(dailyPlan)
        })
        .catch((err) => {
          res.status(400).send(err)
        })
    })
    .catch((err) => {
      res.status(400).send(err)
    })
});

export default router;