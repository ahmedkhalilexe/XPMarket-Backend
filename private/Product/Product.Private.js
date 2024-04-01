const router = require("express").Router();

router.post(
  "/addProduct",
  require("../../controllers/productController").addProduct
);

router.put(
  "/updateProduct",
  require("../../controllers/productController").updateProduct
);

router.delete(
  "/deleteProduct",
  require("../../controllers/productController").deleteProduct
);

router.get(
  "/getAllProducts",
  require("../../controllers/productController").getAllProducts
);
router.get(
  "/getProductById",
  require("../../controllers/productController").getProductById
);

router.get(
  "/getProductsByCategory",
  require("../../controllers/productController").getProductsByCategory
);
module.exports = router;
