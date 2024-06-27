const router = require("express").Router();

router.post(
  "/createOrder",
  require("../../controllers/orderController").createOrder
);
router.get("/getAllOrders",require("../../middleware/authMiddleware").isAdmin, require("../../controllers/orderController").getAllOrders);
router.get("/getAllOrdersByUser", require("../../controllers/orderController").getAllOrdersByUser);
router.get("/getOrderById", require("../../controllers/orderController").getOrderById);
router.put("/updateOrder",require("../../middleware/authMiddleware").isAdmin, require("../../controllers/orderController").updateOrder);
router.delete("/deleteOrder",require("../../middleware/authMiddleware").isAdmin, require("../../controllers/orderController").deleteOrder);
module.exports = router;
