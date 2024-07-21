const router = require("express").Router();

router.post("/", require("../controllers/webhook"))

module.exports = router;