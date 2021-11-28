import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import connection from '@shared/typeorm';
import { errorFilterMiddleware } from '@shared/middlewares/ErrorFilter.middleware';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(errorFilterMiddleware);
connection.then(() => {
  app.listen(3333, () => {
    console.log('Starting aplication, OH YEAH!');
  });
});
