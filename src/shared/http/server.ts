import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import connection from '@shared/typeorm';
import { errorFilterMiddleware } from '@shared/middlewares/ErrorFilter.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorFilterMiddleware);

connection.then(() => {
  app.listen(3333, () => {
    console.log('Starting aplication, OH YEAH!');
  });
});
