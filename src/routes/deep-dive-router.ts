import * as express from 'express';
const router = express.Router();

interface DeepDive {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

/* GET deep dives listings. */
router.get('/', function(req, res, next) {
  res.send('you\'ve reached the deep dive route  ');
});

// a route that posts data to the server
router.post('/', function(req, res, next) {
  console.log(req.body);

  res.json({
    message: 'I received your POST request',
    data: req.body
  });
});

export default router;