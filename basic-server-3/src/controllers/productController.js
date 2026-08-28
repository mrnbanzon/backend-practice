import Product from "../models/Product.js";
import { redis } from '../utils/redisClient.js';

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = new Product({
      name,
      price,
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const cacheKey = 'basic-server-3:products';
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const products = await Product.find().lean();
    await redis.set(cacheKey, JSON.stringify(products), { expiration: { type: 'EX', value: 60 } });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `basic-server-3:products:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const existing = await Product.findById(id).lean();
    if (!existing) {
      return res.status(404).send('Product Not Found');
    }

    await redis.set(cacheKey, JSON.stringify(existing), { expiration: { type: 'EX', value: '60' } });
    res.json(existing);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const existing = await Product.findById(id);
    if (!existing) {
      return res.status(404).send('Product Not Found');
    }

    existing.name = name || existing.name;
    existing.price = price || existing.price;
    existing.category = category || existing.category;

    await existing.save();
    
    await redis.del(`basic-server-3:products:${id}`);
    await redis.del('basic-server-3:products');

    res.json(existing);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    await redis.del(`basic-server-3:products:${id}`);
    await redis.del('basic-server-3:products');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};