const router = require("express").Router();

router.post("/addCart", require("../../controllers/cartController").addToCart);

router.get("/getCart", require("../../controllers/cartController").getCart);

router.put(
  "/updateCart",
  require("../../controllers/cartController").updateCart
);

router.delete(
  "/deleteCart",
  require("../../controllers/cartController").deleteFromCart
);

module.exports = router;
