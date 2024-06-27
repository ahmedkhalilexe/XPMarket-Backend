const jwt = require("jsonwebtoken");
const Auth = {
  privateRouteValidator: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  },
  isAdmin: (req, res, next)=>{
    if(req.user.userRoleId === 1){
      next();
    }else{
      return res.status(403).json({ message: "Unauthorized" });
    }
  }
};
module.exports = Auth;
