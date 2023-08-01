import * as express from 'express';
import Breakfast from '../models/breakfast-model';
const router = express.Router();

/* GET deep dives listings. */
router.get('/', function (req, res, next) {
  res.send('you\'ve reached the deep dive route  ');
});

// a route that posts data to the server
router.post('/', async function (req, res, next) {
  new Breakfast(req.body)
    .save()
    .then(breakfast => {
      res.status(200).json(breakfast.dataValues);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

export default router;