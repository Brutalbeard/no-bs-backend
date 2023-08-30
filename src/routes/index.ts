import { Context, Next } from 'koa';
import Router from '@koa/router';

const router = new Router();

router
    .get('/api/v1', defaultRoute);

async function defaultRoute(ctx: Context, next: Next) {
    ctx.status = 200;
    ctx.body = 'Hello World';
    next();
}
    
export default router;
