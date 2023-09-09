"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const bodyparser_1 = __importDefault(require("@koa/bodyparser"));
const sequelize_1 = require("./utils/sequelize");
const db_setup_1 = require("./utils/db-setup");
const request_id_1 = __importDefault(require("./utils/request-id"));
require('dotenv').config();
(0, sequelize_1.setupDatabase)();
(0, db_setup_1.createDatabaseAssociations)();
const index_1 = __importDefault(require("./routes/index"));
const app = new koa_1.default();
app.use((0, bodyparser_1.default)());
app.use((0, koa_logger_1.default)());
app.use(async (ctx, next) => {
    console.log(ctx.request);
    console.log(ctx.request.body);
    await next();
    console.log(ctx.response);
});
app.use(async (ctx, next) => {
    if (RegExp(/\/api\/v1\/meal/).test(ctx.url)) {
        ctx.state.model = sequelize_1.sequelize.models.meal;
    }
    else if (RegExp(/\/api\/v1\/daily-plan/).test(ctx.url)) {
        ctx.state.model = sequelize_1.sequelize.models.dailyPlan;
    }
    else if (RegExp(/\/api\/v1\/weekly-plan/).test(ctx.url)) {
        ctx.state.model = sequelize_1.sequelize.models.weeklyPlan;
    }
    else {
        ctx.state.model = undefined;
    }
    console.log(ctx.state);
    return next();
});
// add a unique request id to each request
app.use(request_id_1.default);
app.use(index_1.default.routes());
app.use(index_1.default.allowedMethods());
// app.use(mealRouter.routes());
// app.use(mealRouter.allowedMethods());
// app.use(dailyPlanRouter.routes());
// app.use(dailyPlanRouter.allowedMethods());
// app.use(weeklyPlanRouter.routes());
// app.use(weeklyPlanRouter.allowedMethods());
// app.use(apiPath + '/weekly-plan', weeklyPlanRouter);
exports.default = app;
