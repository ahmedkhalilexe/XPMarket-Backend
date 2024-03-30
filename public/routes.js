const router = require("express").Router();

router.use("/user", require("./User/User.public"));

router.use("/Product", require("./Product/Product.public"));

module.exports = router;
