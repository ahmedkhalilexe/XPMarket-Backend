const router = require("express").Router();

router.post(
  "/createOrder",
  require("../../controllers/orderController").createOrder
);

module.exports = router;
