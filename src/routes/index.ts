import { Context, Next } from 'koa';
import Router from '@koa/router';
import { sequelize } from '../utils/sequelize';

let modelRoutePaths = Object.keys(sequelize.models).map((modelName: string) =>
    modelName = `/${modelName.toLowerCase()}`);

let modelRoutePathsWithId = Object.keys(sequelize.models).map((modelName: string) =>
modelName = `/${modelName.toLowerCase()}/:id`);
// let modelRoutePaths = '[meal|daily-plan|weekly-plan]'

const router = new Router({
    prefix: '/api/v1'
});

router
    .get(modelRoutePaths, listItems)
    .get(modelRoutePathsWithId, getById)
    .post(modelRoutePaths, newItem)
    .put(modelRoutePathsWithId, updateItem)
    .delete(modelRoutePathsWithId, deleteById);

console.log(router)

/**
 * This function lists all the items in the database, with optional pagination and includes.
 *
 * @param {Context} ctx - The context of the request.
 * @param {Next} next - The next function to be executed.
 */
async function listItems(ctx: Context, next: Next) {
    await ctx.state.model.findAll({
        limit: ctx.request.query.limit ? Number(ctx.request.query.limit) : 50,
        offset: ctx.request.query.offset ? Number(ctx.request.query.offset) : 0,
        //@ts-ignore
        include: ctx.request.query.include ? ctx.request.query.include.split(',') : [],
    })
        .then((items: any[]) => {
            ctx.response.status = 200;
            ctx.response.body = items;
            next();
        })
        .catch((err: Error) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
            next();
        });
}

/**
 * Retrieves a single item by ID
 *
 * @param {Context} ctx - the Koa request/response context object
 * @param {Next} next - the Koa next callback
 */
async function getById(ctx: Context, next: Next) {
    let item: any = await ctx.state.model
        .findByPk(ctx.params.id, {
            //@ts-ignore
            include: ctx.request.query.include ? ctx.request.query.include.split(',') : [],
        })
        .catch((err: Error) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
        });

    if (item) {
        ctx.response.status = 200;
        ctx.response.body = item;
        next();
    } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
    }
}

/**
 * Creates a new item in the database
 * 
 * @param ctx the Koa request/response context object
 * @param next the Koa next callback
 */
async function newItem(ctx: Context, next: Next) {
    await new ctx.state.model(ctx.request.body)
        .save()
        .then((item: any) => {
            ctx.response.status = 200;
            ctx.response.body = item;
            next();
        })
        .catch((err: Error) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
            next();
        });
}

/**
 * Updates an existing item in the database
 * 
 * @param ctx the Koa request/response context object
 * @param next the Koa next callback
 */
async function updateItem(ctx: Context, next: Next) {
    let item: any = await ctx.state.model
        .findByPk(ctx.params.id)
        .catch((err: Error) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
        });

    if (item) {
        await item
            .update(ctx.request.body)
            .then((item: any) => {
                ctx.response.status = 200;
                ctx.response.body = item;
                next();
            })
            .catch((err: Error) => {
                ctx.response.status = 400;
                ctx.response.body = { message: err.message };
                next();
            })
    } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
    }
}

/**
 * Deletes an item from the database
 * 
 * @param ctx the Koa request/response context object
 * @param next the Koa next callback
 */
async function deleteById(ctx: Context, next: Next) {
    let item: any = await ctx.state.model
        .findByPk(ctx.params.id)
        .catch((err: Error) => {
            ctx.response.status = 400;
            ctx.response.body = { message: err.message };
        });
    if (item) {
        await item
            .destroy()
            .then(() => {
                ctx.response.status = 204;
                ctx.response.body = { message: 'Deleted' };
                next();
            });
    } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
    }
}

export default router;
