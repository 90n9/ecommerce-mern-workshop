import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';

it('return a 404 if the product id is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/products/${id}`)
    .send()
    .expect(404);
});

it('returns the product if the product is found', async () => {
  const seedResponse = await request(app)
    .post(`/products/seed`)
    .send({
      amount: 10
    });

  const id = seedResponse.body[0].id;
  const response = await request(app)
    .get(`/products/${id}`)
    .send();

  expect(response.status).toEqual(200);
  expect(response.body.title).toEqual(seedResponse.body[0].title);
  expect(response.body.price).toEqual(seedResponse.body[0].price);

  
  const id1 = seedResponse.body[1].id;
  const response1 = await request(app)
    .get(`/products/${id1}`)
    .send();

  expect(response1.status).toEqual(200);
  expect(response1.body.title).toEqual(seedResponse.body[1].title);
  expect(response1.body.price).toEqual(seedResponse.body[1].price);

});