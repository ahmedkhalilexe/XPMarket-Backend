const router = require("express").Router();

router.get(
  "/getAllUsers",require("../../middleware/authMiddleware").isAdmin,
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

router.get("/getRecentUsers", require("../../middleware/authMiddleware").isAdmin, require("../../controllers/userController").getRecentUsers);

router.post("/addUser", require("../../middleware/authMiddleware").isAdmin, require("../../controllers/userController").addUser);

router.get("/getUserById", require("../../middleware/authMiddleware").isAdmin, require("../../controllers/userController").getUserById);

router.put("/updateUser", require("../../middleware/authMiddleware").isAdmin, require("../../controllers/userController").updateUser);
module.exports = router;
