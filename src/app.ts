import Koa, { Context, Next } from 'koa';
import logger from 'koa-logger';
import bodyParser from '@koa/bodyparser';

import process from 'node:process';

import { setupDatabase, sequelize } from './utils/sequelize';
import { createDatabaseAssociations } from './utils/db-setup'
import requestIdHeader from './utils/request-id';
require('dotenv').config();

setupDatabase();
createDatabaseAssociations();

import indexRouter from './routes/index';
import readinessRouter from './routes/readiness';
import livenessRouter from './routes/liveness';

const app = new Koa();
app.use(bodyParser());
app.use(logger());

app.use(async (ctx: Context, next: Next) => {
    console.log(ctx.request);
    if(ctx.request.body) console.log(ctx.request.body);
    await next();
    console.log(ctx.response);
});

// add a unique request id to each request
app.use(requestIdHeader);

app.use(readinessRouter.routes());
app.use(readinessRouter.allowedMethods());

app.use(livenessRouter.routes());
app.use(livenessRouter.allowedMethods());

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());


process.on('SIGINT', async () => {
    console.log('Gracefully shutting down');
    await sequelize
        .close()
        .then(() => {
            // console.log('Database connection closed');
            // process.exit(0);
        })
        .catch((err: Error) => {
            console.log('Error closing database connection: ', err.message);
            process.exit(1);
        });
});

export default app;
