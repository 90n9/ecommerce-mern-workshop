import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

import { Product } from '../../models/product';
import { Order } from '../../models/order';

const router = express.Router();

router.post('/orders',
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must greather than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const order = Order.build({
      title,
      price,
      image: ""
    });
    await order.save();
    res.status(201).send(order);
  });

export { router as orderCreateRouter };