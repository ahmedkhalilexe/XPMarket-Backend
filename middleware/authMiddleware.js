const jwt = require("jsonwebtoken");
const Auth = {
  privateRouteValidator: async (req, res, next) => {
    const token = req.cookies.t;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      // console.log(error);
      res.clearCookie("t");
      res.status(403).json({ message: "Unauthorized" });
    }
  },
};
module.exports = Auth;
