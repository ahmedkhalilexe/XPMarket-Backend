const router = require("express").Router();

router.get(
  "/getAllusers",
  require("../../controllers/userController").getAllUsers
);

router.delete(
  "/deleteUser",
  require("../../controllers/userController").deleteUser
);

module.exports = router;
