import * as express from 'express';
const router = express.Router();

/* GET base route. */
router.get('/', function(req, res, next) {
  res.send(200);
});

export default router;
