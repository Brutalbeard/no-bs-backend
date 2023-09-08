"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const router = new router_1.default({
    prefix: '/api/v1'
});
router
    .get('/:model', listItems)
    .get('/:model/:id', getById)
    .post('/:model', newItem)
    .put('/:model/:id', updateItem)
    .delete('/:model/:id', deleteById);
async function listItems(ctx, next) {
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
async function getById(ctx, next) {
    let item = await ctx.state.model
        .findByPk(ctx.params.id)
        .catch((err) => {
        ctx.response.status = 400;
        ctx.response.body = { message: err.message };
    });
    if (item) {
        ctx.response.status = 200;
        ctx.response.body = item;
        next();
    }
    else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
    }
}
async function newItem(ctx, next) {
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
async function updateItem(ctx, next) {
    let item = await ctx.state.model
        .findByPk(ctx.params.id)
        .catch((err) => {
        ctx.response.status = 400;
        ctx.response.body = { message: err.message };
    });
    if (item) {
        await item
            .update(ctx.request.body)
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
    else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
    }
}
async function deleteById(ctx, next) {
    let item = await ctx.state.model
        .findByPk(ctx.params.id)
        .catch((err) => {
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
    }
    else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Not found' };
        next();
    }
}
exports.default = router;
