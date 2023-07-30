import * as express from 'express';
const router = express.Router();

/* GET deep dives listings. */
router.get('/', function(req, res, next) {
  res.send('you\'ve reached the deep dive route  ');
});

// a route that posts data to the server
router.post('/', function(req, res, next) {
  let newDailyRecord = req.body;
  console.log(newDailyRecord);

  res.json({
    message: 'I received your POST request',
    data: newDailyRecord
  });
});

export default router;