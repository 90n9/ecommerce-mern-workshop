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

  //Create product data
  const seedResponse = await request(app)
    .post(`/products/seed`)
    .send({
      amount: 10
    });

  const id = seedResponse.body[0].id;
  const price = seedResponse.body[0].price;
  const qty = 2;
  const products_price = price * qty;
  const tax_price = products_price * 0.07;
  const total_price = products_price * 1.07;

  await request(app)
    .post('/orders')
    .send({
      products_price: products_price,
      tax_price: tax_price,
      total_price: total_price,
      shipping_name: "Narathip Harijiratiwong",
      shipping_mobile: "0840794234",
      shipping_address: "The KEY BTS Wutthakat",
      products: [
        {
          id,
          price,
          qty
        }
      ]
    })
    .expect(201);

  orders = await Order.find({});
  expect(orders.length).toEqual(1);
  expect(orders[0].products_price).toEqual(products_price);
  expect(orders[0].tax_price).toEqual(tax_price);
  expect(orders[0].total_price).toEqual(total_price);
  expect(orders[0].shipping_name).toEqual("Narathip Harijiratiwong");
  expect(orders[0].shipping_mobile).toEqual("0840794234");
  expect(orders[0].shipping_address).toEqual("The KEY BTS Wutthakat");
});
