import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import deepDiveRouter from './routes/deep-dive';
import dailyEntryRouter from './routes/daily-entry';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/deep-dive', deepDiveRouter);
app.use('/daily-entry', dailyEntryRouter);

export default app;
