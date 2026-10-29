import ProductService from './service.js';

const listProducts = async (req, res, next) => {
  const products = await ProductService.fetchProducts(req.query);
  res.status(200).json({ data: products });
};

const fetchProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);

  // TODO: account for product not existing

  res.status(200).json({ data: product });
};

const createProduct = async (req, res, next) => {
  const data = req.body;
  const newProduct = await ProductService.createProduct(data);

  res.status(201).json({ data: newProduct });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  const updatedProduct = await ProductService.updateProduct(id, update);

  // TODO: account for product not existing

  res.status(200).json({ data: updatedProduct });
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  await ProductService.deleteProduct(id);

  res.status(204).end();
};

export default {
  listProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}