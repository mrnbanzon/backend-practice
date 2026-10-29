const listProducts = async (req, res, next) => {
  res.send('list products');
};

const fetchProduct = async (req, res, next) => {
  res.send('fetch product');
};

const createProduct = async (req, res, next) => {
  res.send('create product');
};

const updateProduct = async (req, res, next) => {
  res.send('update product');
};

const deleteProduct = async (req, res, next) => {
  res.send('delete products');
};

export default {
  listProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}