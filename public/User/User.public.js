const router = require("express").Router();

router.post("/signIn", require("../../controllers/userController").signIn);

router.post("/signUp", require("../../controllers/userController").signUp);

module.exports = router;
