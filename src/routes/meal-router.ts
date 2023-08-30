import { Context, Next } from 'koa';
import Router from '@koa/router';
import Meal from '../models/meal-model';

const router = new Router();

router
  .get('/api/v1/meal', listMeals)
  .get('/api/v1/meal/:id', getById)
  .post('/api/v1/meal', newMeal)
  .put('/api/v1/meal/:id', updateMeal)
  .delete('/api/v1/meal/:id', deleteById);


/* GET meal listings. */
async function listMeals(ctx: Context, next: Next) {
  await Meal.findAll({
    limit: ctx.request.query.limit ? Number(ctx.request.query.limit) : 50,
    offset: ctx.request.query.offset ? Number(ctx.request.query.offset) : 0,
    //@ts-ignore
    include: ctx.request.query.include ? ctx.request.query.include.split(',') : []
  })
    .then((meals) => {
      ctx.response.status = 200;
      ctx.response.body = meals;
      next();
    })
    .catch((err) => {
      ctx.response.status = 400;
      ctx.response.body = { message: err.message };
      next();
    });
}

/* GET meal by id. */
async function getById(ctx: Context, next: Next) {
  await Meal
    .findByPk(ctx.params.id)
    .then((meal) => {
      if (meal) {
        ctx.response.status = 200;
        ctx.response.body = meal;
        next();
      } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
      }
    })
    .catch((err) => {
      ctx.response.status = 404;
      ctx.response.body = { message: err.message };
      next();
    });
}

/* POST meal */
async function newMeal(ctx: Context, next: Next) {
  await new Meal(ctx.request.body)
    .save()
    .then((meal) => {
      ctx.response.status = 200;
      ctx.response.body = meal;
      next();
    })
    .catch((err) => {
      ctx.response.status = 400;
      ctx.response.body = { message: err.message };
      next();
    });
}

// a route that updates data on the server
async function updateMeal(ctx: Context, next: Next) {
  await Meal
    .findByPk(ctx.params.id)
    .then(async (meal) => {
      if (meal) {
        await meal
          .update(ctx.request.body)
          .then((meal) => {
            ctx.response.status = 200;
            next();
          })
          .catch((err) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
            next();
          })
      } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
      }
    });
}

// a route that deletes data on the server
async function deleteById(ctx: Context, next: Next) {
  await Meal
    .findByPk(ctx.params.id)
    .then(async (meal) => {
      await meal
        .destroy()
        .then(() => {
          ctx.response.status = 201;
          ctx.response.body = { message: 'Deleted' };
          next();
        })
        .catch((err) => {
          ctx.response.status = 400;
          ctx.response.body = { message: err.message };
          next();
        })
    })
    .catch((err) => {
      ctx.response.status = 404;
      ctx.response.body = { message: err.message };
      next();
    });
}

export default router;