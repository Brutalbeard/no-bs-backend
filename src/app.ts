import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelize from './utils/sequelize';
require('dotenv').config();

import indexRouter from './routes/index';
import deepDiveRouter from './routes/deep-dive-router';
import mealRouter from './routes/meal-router';
import dailyPlanRouter from './routes/daily-plan-router';

const app = express();

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync({ force: true });
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const apiPath = '/api/v1';

app.use(apiPath + '/', indexRouter);
app.use(apiPath + '/deep-dive', deepDiveRouter);
app.use(apiPath + '/meal', mealRouter);
app.use(apiPath + '/daily-plan', dailyPlanRouter);

export default app;
