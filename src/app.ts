import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from '@koa/bodyparser';

import { setupDatabase } from './utils/sequelize';
import { createDatabaseAssociations } from './utils/db-setup'
import requestIdHeader from './utils/request-id';
require('dotenv').config();

setupDatabase();
createDatabaseAssociations();

import indexRouter from './routes/index';
import mealRouter from './routes/meal-router';
import dailyPlanRouter from './routes/daily-plan-router';
import weeklyPlanRouter from './routes/weekly-plan-router';


const app = new Koa();
app.use(bodyParser());
app.use(logger());

app.use(async (ctx, next) => {
    console.log(ctx.request);
    console.log(ctx.request.body);
    await next();
    console.log(ctx.response);
});

// add a unique request id to each request
app.use(requestIdHeader);

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

app.use(mealRouter.routes());
app.use(mealRouter.allowedMethods());

app.use(dailyPlanRouter.routes());
app.use(dailyPlanRouter.allowedMethods());

app.use(weeklyPlanRouter.routes());
app.use(weeklyPlanRouter.allowedMethods());

// app.use(apiPath + '/weekly-plan', weeklyPlanRouter);

export default app;
