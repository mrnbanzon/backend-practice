import Product from "../models/Product.js";
import { redis } from '../utils/redisClient.js';
import { generateCursor, parseCursor } from "../utils/cursor.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = new Product({
      name,
      price,
      category,
    });

    await newProduct.save();

    // TODO: consider moving caching logic to utils
    for await(const key of redis.scanIterator({
      MATCH: 'basic-server-3:products:limit*',
      COUNT: 100
    })) {
      if (key.length) {
        await redis.unlink(key);
      }
    }

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { cursor = '', category = '', limit = 5 } = req.query;
    const parsedCursor = parseCursor(cursor);
    const parsedLimit = Number(limit);

    const cacheKey = `basic-server-3:products:limit:${limit}${category ? `:${category}` : ''}${parsedCursor ? `:${parsedCursor}` : ''}`.trim();
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const query = {};
    if (parsedCursor) {
      query._id = {
        $gt: parsedCursor,
      }
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).limit(parsedLimit + 1).lean();
    
    const hasNext = products.length > parsedLimit;

    if (hasNext) {
      products.pop();
    }

    const result = {
      products,
      pagination: {
        hasNext,
        nextCursor: hasNext ? generateCursor(products[products.length - 1]) : null,
      }
    };

    await redis.set(cacheKey, JSON.stringify(result), { expiration: { type: 'EX', value: 60 } });
    res.json(result);
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
    
    // TODO: consider moving caching logic to utils 
    await redis.del(`basic-server-3:products:${id}`);

    for await(const key of redis.scanIterator({
      MATCH: 'basic-server-3:products:limit*',
      COUNT: 100
    })) {
      if (key.length) {
        await redis.unlink(key);
      }
    }

    res.json(existing);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    // TODO: consider moving caching logic to utils 
    await redis.del(`basic-server-3:products:${id}`);
    
    for await(const key of redis.scanIterator({
      MATCH: 'basic-server-3:products:limit*',
      COUNT: 100
    })) {
      if (key.length) {
        await redis.unlink(key);
      }
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};