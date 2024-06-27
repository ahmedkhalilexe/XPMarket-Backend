const router = require("express").Router();

router.post(
  "/addProduct",require("../../middleware/authMiddleware").isAdmin,
  require("../../controllers/productController").addProduct
);

router.put(
  "/updateProduct",require("../../middleware/authMiddleware").isAdmin,
  require("../../controllers/productController").updateProduct
);

router.delete(
  "/deleteProduct",require("../../middleware/authMiddleware").isAdmin,
  require("../../controllers/productController").deleteProduct
);
module.exports = router;
