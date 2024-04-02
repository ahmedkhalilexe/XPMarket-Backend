const router = require("express").Router();

router.post("/addCart", require("../../controllers/cartController").addToCart);

router.get("/getCart", require("../../controllers/cartController").getCart);

router.put(
  "/updateCartItem",
  require("../../controllers/cartController").updateCartItem
);

router.delete(
  "/deleteFromCart",
  require("../../controllers/cartController").deleteFromCart
);

module.exports = router;
