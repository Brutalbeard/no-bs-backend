import { Context, Next } from 'koa';
import Router from '@koa/router';

const router = new Router({
    prefix: '/api/v1'
});

router.get('/readiness', readiness);

async function readiness(ctx: Context, next: Next) {
    ctx.response.status = 200;
    ctx.response.body = { message: 'OK' };
    next();
}

export default router;