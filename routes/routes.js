const router = require("express").Router();
const express = require("express");
router.use("/public",express.json(), require("../public/routes"));

router.use(
  "/private",express.json(),
  require("../middleware/authMiddleware").privateRouteValidator,
  require("../private/routes")
);

router.use("/webhook",express.raw({ type: 'application/json' }), require("../webhook/router") );

module.exports = router;
