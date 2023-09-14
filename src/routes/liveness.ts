import { Context, Next } from 'koa';
import Router from '@koa/router';
import emitter from '../utils/events';

const router = new Router({
    prefix: '/api/v1'
});

router.get('/liveness', liveness);

let dbSynced = false;
let dbConnected = false;

emitter.on('db-synced', (status: boolean) => {
    dbSynced = status;
});

emitter.on('db-connected', (status: boolean) => {
    dbConnected = status;
});

async function liveness(ctx: Context, next: Next) {
    if (dbConnected && dbSynced) {
        ctx.response.status = 200;
        ctx.response.body = { message: 'OK' };
        next();
    } else {
        ctx.response.status = 500;
        ctx.response.body = { message: 'Database not ready' };
        next();
    }
}

export default router;