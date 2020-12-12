import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

import { Product } from '../../models/product';
import { Order } from '../../models/order';

const router = express.Router();
interface OrderItem {
  _id: string,
  price: number,
  qty: number
}

router.post('/orders',
  [
    body('products_price')
      .isFloat({ gt: 0 })
      .withMessage('Product price must greather than 0'),
    body('tax_price')
      .isFloat({ gt: 0 })
      .withMessage('Tax price must greather than 0'),
    body('total_price')
      .isFloat({ gt: 0 })
      .withMessage('Total price must greather than 0'),
    body('shipping_name')
      .not()
      .isEmpty()
      .withMessage('Contact name is required'),
    body('shipping_mobile')
      .not()
      .isEmpty()
      .withMessage('Mobile number is required'),
    body('shipping_address')
      .not()
      .isEmpty()
      .withMessage('Shipping address is required'),
    body('products')
      .not()
      .isEmpty()
      .withMessage('Product items are required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { products_price, tax_price, total_price, shipping_name, shipping_mobile, shipping_address } = req.body;
    const productsReq = req.body.products;
    const products: OrderItem[] = productsReq.map((product: { id: string, price: number, qty: number }) => {
      return {
        _id: product.id,
        price: product.price,
        qty: product.qty
      }
    });
    const calc_products_price = products.map((product) => product.price * product.qty).reduce((a, b) => a + b);
    if (products_price !== calc_products_price) {
      throw new BadRequestError("Products price is not correct");
    }
    if (tax_price !== calc_products_price * 0.07) {
      throw new BadRequestError("Tax price is not correct");
    }
    if (total_price !== calc_products_price * 1.07) {
      throw new BadRequestError("Total price is not correct");
    }
    const order = Order.build({
      products_price,
      tax_price,
      total_price,
      shipping_name,
      shipping_mobile,
      shipping_address,
      products
    });
    await order.save();
    res.status(201).send(order);
  });

export { router as orderCreateRouter };