const router = require("express").Router();

router.use("/public", require("../public/routes"));

router.use(
  "/private",
  require("../middleware/authMiddleware").privateRouteValidator,
  require("../private/routes")
);

module.exports = router;
