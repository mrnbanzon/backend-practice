import { Router } from 'express';

import ProductController from './controller.js';

const router = Router();

router.route('/')
  .get(ProductController.listProducts)
  .post(ProductController.createProduct);

router.route('/:id')
  .get(ProductController.fetchProduct)
  .patch(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

export default router;