import { v4 as uuidv4 } from 'uuid';
import { Context, Next } from 'koa';

const requestIdHeader = async function (ctx: Context, next: Next) {
    ctx.request.headers['x-no-bs-request-id'] = uuidv4();
    ctx.response.set('x-no-bs-request-id', ctx.request.headers['x-no-bs-request-id']);

    return next();
}

export default requestIdHeader;