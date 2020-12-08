import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
const cors = require('cors');

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

import { productIndexRouter } from './routes/products/index';
import { productShowRouter } from './routes/products/show';
import { orderCreateRouter } from './routes/orders/create';

// use for create product data
import { productSeedRouter } from './routes/products/seed';

const app = express();
app.set('trust proxy', true);

app.use(cors());
app.use(json());

app.use(productSeedRouter);
app.use(productShowRouter);
app.use(productIndexRouter);
app.use(orderCreateRouter);

//if not above path is match then return not found error
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

//catch throwed error and return all in same format
app.use(errorHandler);

export { app };