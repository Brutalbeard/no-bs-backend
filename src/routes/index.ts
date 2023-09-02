import { Context, Next } from 'koa';
import Router from '@koa/router';
import { sequelize } from '../utils/sequelize';

const router = new Router({
    prefix: '/api/v1'
});

router
    .get('/:model', listItems)
    .get('/:model/:id', getById)
    .post('/:model', newItem)
    .put('/:model/:id', updateItem)
    .delete('/:model/:id', deleteById);



async function listItems(ctx: Context, next: Next) {
    if(!ctx.state.model) { next(); return; }  
    await ctx.state.model.findAll({
        limit: ctx.request.query.limit ? Number(ctx.request.query.limit) : 50,
        offset: ctx.request.query.offset ? Number(ctx.request.query.offset) : 0,
        //@ts-ignore
        include: ctx.request.query.include ? ctx.request.query.include.split(',') : []
    })
        .then((items) => {
            ctx.response.status = 200;
            ctx.response.body = items;
            next();
        })
        .catch((err) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
            next();
        });
}

async function getById(ctx: Context, next: Next) {
    await ctx.state.model.findByPk(ctx.params.id)
        .then((item) => {
            if (item) {
                ctx.response.status = 200;
                ctx.response.body = item;
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

async function newItem(ctx: Context, next: Next) {
    if(!ctx.state.model) { next(); return; }
    await new ctx.state.model(ctx.request.body)
        .save()
        .then((item) => {
            ctx.response.status = 200;
            ctx.response.body = item;
            next();
        })
        .catch((err) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
            next();
        });
}

async function updateItem(ctx: Context, next: Next) {
    await ctx.state.model.findByPk(ctx.params.id)
      .then(async (item) => {
        if (item) {
          await item
            .update(ctx.request.body)
            .then((item) => {
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

  async function deleteById(ctx: Context, next: Next) {
    await ctx.state.model.findByPk(ctx.params.id)
      .then(async (item) => {
        await item
          .destroy()
          .then(() => {
            ctx.response.status = 204;
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
