import { Context, Next } from 'koa';
import Router from '@koa/router';
import DailyPlan from '../models/daily-plan-model';

const router = new Router();

router
  .get('/api/v1/daily-plan', listPlans)
  .get('/api/v1/daily-plan/:id', getPlanById)
  .post('/api/v1/daily-plan', newPlan)
  .put('/api/v1/daily-plan/:id', updatePlan)
  .delete('/api/v1/daily-plan/:id', deleteById);

/* GET deep dives listings. */
async function listPlans(ctx: Context, next: Next) {
  await DailyPlan.findAll({
    limit: ctx.request.query.limit ? Number(ctx.request.query.limit) : 50,
    offset: ctx.request.query.offset ? Number(ctx.request.query.offset) : 0
  })
    .then((plans) => {
      ctx.response.status = 200;
      ctx.response.body = plans;
      next();
    })
    .catch((err) => {
      ctx.response.status = 400;
      ctx.response.body = { message: err.message };
      next();
    });
}

async function getPlanById(ctx: Context, next: Next) {
  await DailyPlan
    .findByPk(ctx.params.id)
    .then((plan) => {
      if (plan) {
        ctx.response.status = 200;
        ctx.response.body = plan;
        next();
      } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
      }
    });
}

async function newPlan(ctx: Context, next: Next) {
  await new DailyPlan(ctx.request.body)
    .save()
    .then((plan) => {
      ctx.response.status = 200;
      ctx.response.body = plan;
      next();
    })
    .catch((err) => {
      ctx.response.status = 400;
      ctx.response.body = { message: err.message };
      next();
    });
}

async function updatePlan(ctx: Context, next: Next) {
  await DailyPlan
    .findByPk(ctx.params.id)
    .then(async (plan) => {
      if (plan) {
        await plan
          .update(ctx.request.body)
          .then((plan) => {
            ctx.response.status = 200;
            ctx.response.body = plan;
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

async function deleteById(ctx: Context, next: Next) {
  await DailyPlan
    .findByPk(ctx.params.id)
    .then(async (plan) => {
      await plan.destroy()
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