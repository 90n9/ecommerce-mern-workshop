import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';

it('has a route handler listening to /products for get request', async () => {
  const response = await request(app)
    .get(`/products`)
    .send();
  expect(response.status).not.toEqual(404);
});

it('has a route handler listening to /products for get request', async () => {
  await request(app)
    .post(`/products/seed`)
    .send({
      amount: 10
    });

  const response = await request(app)
    .get(`/products`)
    .send();
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(10);
});