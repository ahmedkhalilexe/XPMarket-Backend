const router = require("express").Router();

router.get(
    "/getRefresh",
    require("../../controllers/refreshController").getRefresh
);

module.exports = router;
