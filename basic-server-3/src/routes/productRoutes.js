import express from 'express';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(createProduct);

router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

export default router;