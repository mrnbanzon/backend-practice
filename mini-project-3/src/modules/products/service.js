import Product from './model.js';

const buildFilter = (query) => {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    tags,
    inStock,
  } = query;

  const filter = {};

  if (q) {
    filter.$text = { $search: q };
  }

  if (category) {
    filter.category = category;
  }

  if (inStock !== undefined) {
    filter.inStock = inStock === 'true';
  }

  if (tags) {
    filter.tags = { $all: tags.split(',') };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  return filter;
};

const fetchProducts = async (query) => {
  const { sort, cursor, page = 1, limit = 20 } = query;
  const filter = buildFilter(query);

  // creating sortObj
  const sortObj = {};
  const sortKey = sort.startsWith('-') ? sort.slice(1) : sort;
  sortObj[sortKey] = sort.startsWith('-') ? -1 : 1;

  // handle cursor pagination - basic createdAt cursor
  if (cursor) {
    filter.createdAt = {
      ...filter.createdAt || {},
      $lt: new Date(cursor),
    };

    const products = await Product.find(filter)
      .sort(sortObj)
      .limit(Number(limit))
      .lean();

    const nextCursor = products.length ?
      products[products.length -1].createdAt.toISOString() : null;

    return { products, nextCursor };
  }

  // handle limit offset pagination
  const skip = (Math.max(Number(page), 1) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit)).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit)),
  };
};

const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
}

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const updateProduct = async (id, update) => {
  return await Product.findByIdAndUpdate(id, update, { returnDocument: 'after', runValidators: true }).lean();
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id).lean();
}

export default {
  fetchProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
}