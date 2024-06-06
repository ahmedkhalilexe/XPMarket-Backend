const router = require("express").Router();

router.get(
  "/getProductById",
  require("../../controllers/productController").getProductById
);

router.get(
  "/getAllProducts",
  require("../../controllers/productController").getAllProducts
);

router.get(
  "/getProductsByCategory",
  require("../../controllers/productController").getProductsByCategory
);
router.get("/getOnSaleProducts", require("../../controllers/productController").getOnSaleProducts);

router.get("/getNewProducts", require("../../controllers/productController").getNewProducts);

module.exports = router;
