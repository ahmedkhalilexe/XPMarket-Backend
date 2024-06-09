const jwt = require("jsonwebtoken");
const Auth = {
  privateRouteValidator: async (req, res, next) => {
    const token = req.cookies.t;
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      // console.log(error);
      res.clearCookie("t");
      res.status(403).json({ message: "Unauthorized" });
    }
  },
};
module.exports = Auth;
