import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import requestIdHeader from './utils/request-id';
import { setupDatabase } from './utils/sequelize';
import { createDatabaseAssociations } from './utils/db-setup'
require('dotenv').config();

setupDatabase();
createDatabaseAssociations();

import indexRouter from './routes/index';
import deepDiveRouter from './routes/deep-dive-router';
import mealRouter from './routes/meal-router';
import dailyPlanRouter from './routes/daily-plan-router';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(requestIdHeader);

const apiPath = '/api/v1';

app.use(apiPath + '/', indexRouter);
app.use(apiPath + '/deep-dive', deepDiveRouter);
app.use(apiPath + '/meal', mealRouter);
app.use(apiPath + '/daily-plan', dailyPlanRouter);

export default app;
