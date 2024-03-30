const router = require("express").Router();

router.use("/public", require("../public/routes"));

router.use("/private", require("../private/routes"));

module.exports = router;
