const router = require("express").Router();

router.get(
  "/getAllusers",
  require("../../controllers/userController").getAllUsers
);

router.delete(
  "/deleteUser",
  require("../../controllers/userController").deleteUser
);
router.post(
  "/userOrder",
  require("../../controllers/userController").userOrder
);

module.exports = router;
