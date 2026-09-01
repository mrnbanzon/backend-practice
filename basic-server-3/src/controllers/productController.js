import productService from '../services/productService.js';

import { redis } from '../utils/redisClient.js';
import { parseCursor } from "../utils/cursor.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = await productService.createProduct({ name, price, category });

    // TODO: consider moving caching logic to utils
    for await(const key of redis.scanIterator({
      MATCH: 'basic-server-3:products:filter*',
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

    const categoryKey = category ? `:category:${category}` : '';
    const cursorKey = parsedCursor ? `:cursor:${parsedCursor}`: '';
    const cacheKey = `basic-server-3:products:filter:limit:${limit}${categoryKey}${cursorKey}`.trim();
  
    const cached = await redis.get(cacheKey);  
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const { products, nextCursor } = await productService.fetchProducts({
      limit: Number(limit),
      cursor: parsedCursor,
      category,
    });

    const result = {
      products,
      pagination: {
        hasNext: !!nextCursor,
        nextCursor,
      }
    };

    await redis.set(cacheKey, JSON.stringify(result), { expiration: { type: 'EX', value: 180 } });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `basic-server-3:products:id:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const existing = await productService.fetchProductById(id);
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

    const updatedProduct = await productService.updateProduct(id, { name, price, category });
    
    // TODO: consider moving caching logic to utils 
    await redis.del(`basic-server-3:products:id:${id}`);

    for await(const key of redis.scanIterator({
      MATCH: 'basic-server-3:products:filter*',
      COUNT: 100
    })) {
      if (key.length) {
        await redis.unlink(key);
      }
    }

    res.json(updatedProduct);
  } catch (err) {
    if (err.message === 'Product Not Found') {
      return res.status(404).send('Product Not Found');
    }
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    // TODO: consider moving caching logic to utils 
    await redis.del(`basic-server-3:products:id:${id}`);
    
    for await(const key of redis.scanIterator({
      MATCH: 'basic-server-3:products:filter*',
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