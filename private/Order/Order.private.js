const router = require("express").Router();

router.post(
  "/createOrder",
  require("../../controllers/orderController").createOrder
);
router.get("/getAllOrders", require("../../controllers/orderController").getAllOrders);
router.get("/getAllOrdersByUser", require("../../controllers/orderController").getAllOrdersByUser);
router.get("/getOrderById", require("../../controllers/orderController").getOrderById);
router.put("/updateOrder", require("../../controllers/orderController").updateOrder);
router.delete("/deleteOrder", require("../../controllers/orderController").deleteOrder);
module.exports = router;
