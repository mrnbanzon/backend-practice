import Product from "../models/Product.js";

const createProduct = (req, res, next) => {
  console.log('creating product');
  res.end();
};

const getAllProducts = (req, res, next) => {
  console.log('fetching all products');
  res.end();
};

const updateProduct = (req, res, next) => {
  console.log('updating product');
  res.end();
};

const deleteProduct = (req, res, next) => {
  console.log('deleting product');
  res.end();
};

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};