const router = require("express").Router();

router.post("/signIn", require("../../controllers/userController").signIn);

router.post("/signUp", require("../../controllers/userController").signUp);

router.post("/signOut", require("../../controllers/userController").signOut);

module.exports = router;
