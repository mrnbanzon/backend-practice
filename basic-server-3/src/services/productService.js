import Product from "../models/Product.js";
import { generateCursor } from "../utils/cursor.js";

const createProduct = async ({ name, price, category }) => {
  const product = new Product({ name, price, category });
  await product.save();
  return product;
};

const fetchProducts = async ({ limit = 5, cursor, category }) => {
  const query = {};

  if (cursor) {
    query._id = { $gt: cursor };
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query).limit(limit + 1).lean();
  const hasNext = products.length > limit;
  const nextCursor = hasNext ? generateCursor(products[limit - 1]) : null;

  return {
    products: hasNext ? products.slice(0, limit) : products,
    nextCursor,
  };
};

const fetchProductById = async (id) => {
  return await Product.findById(id);
};

const updateProduct = async (id, { name, price, category }) => {
  const existing = await Product.findById(id);

  if (!existing) {
    throw new Error('Product Not Found');
  }

  existing.name = name || existing.name;
  existing.price = price || existing.price;
  existing.category = category || existing.category;

  await existing.save();
  return existing;
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

export default {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
}