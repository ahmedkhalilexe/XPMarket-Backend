const router = require("express").Router();

router.use("/public", require("../public/routes"));

router.use(
  "/private",
  require("../controllers/authController").privateRouteValidator,
  require("../private/routes")
);

module.exports = router;
