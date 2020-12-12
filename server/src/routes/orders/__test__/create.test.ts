import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';
import { Order } from '../../../models/order';


it('has a route handler listening to /orders for post requests', async () => {
  const response = await request(app)
    .post('/orders')
    .send({});
  expect(response.status).not.toEqual(404);
});

it('returns and error if an invalid input is provided', async () => {
  const {
    products_price,
    tax_price,
    total_price,
    shipping_name,
    shipping_mobile,
    shipping_address
  } = {
    products_price: 1000,
    tax_price: 70,
    total_price: 1070,
    shipping_name: "Narathip Harijiratiwong",
    shipping_mobile: "0840794234",
    shipping_address: "The KEY BTS Wutthakat"
  };
  await request(app)
    .post('/orders')
    .send({
      products_price: 0,
      tax_price,
      total_price,
      shipping_name,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      tax_price,
      total_price,
      shipping_name,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price: 0,
      total_price,
      shipping_name,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      total_price,
      shipping_name,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price: 0,
      shipping_name,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      shipping_name,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price,
      shipping_name: "",
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price,
      shipping_mobile,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price,
      shipping_name,
      shipping_mobile: "",
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price,
      shipping_name,
      shipping_address
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price,
      shipping_name,
      shipping_mobile,
      shipping_address: ""
    })
    .expect(400);

  await request(app)
    .post('/orders')
    .send({
      products_price,
      tax_price,
      total_price,
      shipping_name,
      shipping_mobile
    })
    .expect(400);
});

it('create a order with valid inputs', async () => {
  let orders = await Order.find({});
  expect(orders.length).toEqual(0);

  await request(app)
    .post('/orders')
    .send({
      products_price: 1000,
      tax_price: 70,
      total_price: 1070,
      shipping_name: "Narathip Harijiratiwong",
      shipping_mobile: "0840794234",
      shipping_address: "The KEY BTS Wutthakat",
      products: [
        {
          "price": 1000,
          "qty": 1,
          "id": "productid"
        }
      ]
    })
    .expect(201);

  orders = await Order.find({});
  expect(orders.length).toEqual(1);
  expect(orders[0].products_price).toEqual(1000);
  expect(orders[0].tax_price).toEqual(70);
  expect(orders[0].total_price).toEqual(1070);
  expect(orders[0].shipping_name).toEqual("Narathip Harijiratiwong");
  expect(orders[0].shipping_mobile).toEqual("0840794234");
  expect(orders[0].shipping_address).toEqual("The KEY BTS Wutthakat");
});
