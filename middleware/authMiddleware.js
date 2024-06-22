const jwt = require("jsonwebtoken");
const Auth = {
  privateRouteValidator: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {

      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  },
};
module.exports = Auth;
