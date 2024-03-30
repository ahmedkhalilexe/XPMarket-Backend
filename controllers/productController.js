const Product = {
  addProduct: (req, res) => {
    res.status(200).json({ message: "test" });
  },
  updateProduct: (req, res) => {},

  deleteProduct: (req, res) => {},

  getProductById: (req, res) => {},

  getAllProducts: (req, res) => {},

  getProductsByCategory: (req, res) => {},
};

module.exports = Product;
