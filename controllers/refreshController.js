const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const Refresh = {
    getRefresh: async (req, res) => {
        const refreshToken = req.cookies.rt;
        if (!refreshToken) {
            return res.status(403).json({message: "Unauthorized"});
        }
        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const user = await prisma.users.findUnique({
                where: {userId: decodedRefreshToken.userId},
            });
            user.userPassword = undefined;
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "10m",
            });
            res.status(200).json({message: "Token refreshed", user, token})
        } catch (err) {
            res.clearCookie("rt")
            return res.status(403).json({message: "Unauthorized"});
        }
    }

}
module.exports = Refresh;