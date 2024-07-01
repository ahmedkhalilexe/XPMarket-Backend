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

router.get(
    "/getTotalProducts",require("../../middleware/authMiddleware").isAdmin,
    require("../../controllers/productController").getTotalProducts
);
module.exports = router;
