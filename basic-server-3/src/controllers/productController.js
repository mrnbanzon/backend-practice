import Product from "../models/Product.js";

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
    const products = await Product.find().lean();
    res.json(products);
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
      return res.status(404).send('Product not found.');
    }

    existing.name = name || existing.name;
    existing.price = price || existing.price;
    existing.category = category || existing.category;

    await existing.save();
    res.json(existing);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};