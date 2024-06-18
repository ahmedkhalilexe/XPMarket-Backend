const router = require("express").Router();

router.get(
  "/getAllusers",
  require("../../controllers/userController").getAllUsers
);
// router.get(
//   "/getUser",
//   require("../../controllers/userController").getUser
// );
router.delete(
  "/deleteUser",
  require("../../controllers/userController").deleteUser
);

module.exports = router;
