const router = require("express").Router();

router.use("/user", require("./User/User.public"));

router.use("/Product", require("./Product/Product.public"));

router.use("/refresh", require("./Refresh/Refresh.public"));

module.exports = router;
