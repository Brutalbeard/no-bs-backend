import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelize from './utils/sequelize';

import indexRouter from './routes/index';
import deepDiveRouter from './routes/deep-dive';
import dailyEntryRouter from './routes/daily-entry';
import mealRouter from './routes/meal';

const app = express();

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync();
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/deep-dive', deepDiveRouter);
app.use('/daily-entry', dailyEntryRouter);
app.use('/meal', mealRouter);

export default app;
