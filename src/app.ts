import Koa, { Context, Next } from 'koa';
import logger from 'koa-logger';
import bodyParser from '@koa/bodyparser';

import { setupDatabase, sequelize } from './utils/sequelize';
import { createDatabaseAssociations } from './utils/db-setup'
import requestIdHeader from './utils/request-id';
require('dotenv').config();

setupDatabase();
createDatabaseAssociations();

import indexRouter from './routes/index';

const app = new Koa();
app.use(bodyParser());
app.use(logger());

app.use(async (ctx: Context, next: Next) => {
    console.log(ctx.request);
    console.log(ctx.request.body);
    await next();
    console.log(ctx.response);
});

app.use(async (ctx: Context, next: Next) => {
    if(RegExp(/\/api\/v1\/meal/).test(ctx.url)) {ctx.state.model = sequelize.models.Meal;}
    else if(RegExp(/\/api\/v1\/daily-plan/).test(ctx.url)) {ctx.state.model = sequelize.models.DailyPlan;}
    else if(RegExp(/\/api\/v1\/weekly-plan/).test(ctx.url)) {ctx.state.model = sequelize.models.WeeklyPlan;}
    else {ctx.state.model = undefined;}

    console.log(ctx.state)

    return next();
});
        

// add a unique request id to each request
app.use(requestIdHeader);

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

// app.use(mealRouter.routes());
// app.use(mealRouter.allowedMethods());

// app.use(dailyPlanRouter.routes());
// app.use(dailyPlanRouter.allowedMethods());

// app.use(weeklyPlanRouter.routes());
// app.use(weeklyPlanRouter.allowedMethods());

// app.use(apiPath + '/weekly-plan', weeklyPlanRouter);

export default app;
