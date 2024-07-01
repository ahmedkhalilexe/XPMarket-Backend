const router = require("express").Router();

router.get(
  "/getAllusers",require("../../middleware/authMiddleware").isAdmin,
  require("../../controllers/userController").getAllUsers
);
// router.get(
//   "/getUser",
//   require("../../controllers/userController").getUser
// );
router.delete(
  "/deleteUser",require("../../middleware/authMiddleware").isAdmin,
  require("../../controllers/userController").deleteUser
);
router.get("/getAllUsersCount",require("../../middleware/authMiddleware").isAdmin,require("../../controllers/userController").getAllUsersCount);

router.get("/getRecentUsers",require("../../middleware/authMiddleware").isAdmin,require("../../controllers/userController").getRecentUsers);

module.exports = router;
