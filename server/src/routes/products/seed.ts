import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { commerce } from 'faker';
import { validateRequest } from '../../middlewares/validate-request';
import { Product, ProductDoc } from '../../models/product';

const router = express.Router();

//seed product data for uat only
router.post('/products/seed',
  [
    body('amount')
      .isFloat({ gt: 0 })
      .withMessage('Amount must greather than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { amount } = req.body;
    const products: ProductDoc[] = [];
    for (let i = 0; i < amount; i++) {
      const product = Product.build({
        title: commerce.productName(),
        price: parseFloat(commerce.price()),
        image: "https://picsum.photos/367/267"
      });
      await product.save();
      products.push(product);
    }
    res.status(201).send(products);
  });

export { router as productSeedRouter };