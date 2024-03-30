const router = require("express").Router();

router.use("/user", require("./User/User.Private"));

router.use("/Product", require("./Product/Product.Private"));

router.use("/Cart", require("../private/Cart/Cart.Private"));

module.exports = router;
