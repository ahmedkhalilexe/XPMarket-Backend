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
module.exports = router;
