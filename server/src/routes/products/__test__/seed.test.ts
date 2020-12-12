import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';

it('has a route handler listening to /products/seed for post request', async () => {
  const response = await request(app)
    .post(`/products/seed`)
    .send({});
  expect(response.status).not.toEqual(404);
});

it('return product list if seed is product is success', async () => {
  const seedResponse = await request(app)
    .post(`/products/seed`)
    .send({
      amount: 10
    });
  expect(seedResponse.body.length).toEqual(10);
});