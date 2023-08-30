import { Context, Next } from 'koa';
import Router from '@koa/router';
import WeeklyPlan from '../models/weekly-plan-model';

const router = new Router();

router
  .get('/api/v1/weekly-plan', listPlans)
  .get('/api/v1/weekly-plan/:id', getPlanById)
  .post('/api/v1/weekly-plan', newPlan)
  .put('/api/v1/weekly-plan/:id', updatePlan)
  .delete('/api/v1/weekly-plan/:id', deleteById);

/* GET weekly plan listings. */
async function listPlans(ctx: Context, next: Next) {
  await WeeklyPlan.findAll({
    limit: ctx.query.limit ? Number(ctx.query.limit) : 50,
    offset: ctx.query.offset ? Number(ctx.query.offset) : 0,
    //@ts-ignore
    include: ctx.query.include ? ctx.query.include.split(',') : []
  })
    .then((plans) => {
      ctx.status = 200;
      ctx.body = plans;
      next();
    })
    .catch((err: Error) => {
      ctx.status = 400;
      ctx.body = { message: err.message };
      next();
    });
}

async function getPlanById(ctx: Context, next: Next) {
  await WeeklyPlan
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
  await new WeeklyPlan(ctx.request.body)
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
  await WeeklyPlan
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
  await WeeklyPlan
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