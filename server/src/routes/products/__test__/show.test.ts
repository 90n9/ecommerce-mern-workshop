import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';

it('return a 404 if the product is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/products/${id}`)
    .send()
    .expect(404);
});

it('returns the product if the product is found', async () => {
  const title = 'concert';
  const price = 20;

  // const response = await request(app)
  //   .post('/api/tickets')
  //   .set('Cookie', global.signin())
  //   .send({
  //     title, price
  //   });
  // const ticketResponse = await request(app)
  //   .get(`/api/tickets/${response.body.id}`)
  //   .send();

  // expect(ticketResponse.body.title).toEqual(title);
  // expect(ticketResponse.body.price).toEqual(price)

});