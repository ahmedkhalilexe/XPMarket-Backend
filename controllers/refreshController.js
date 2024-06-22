const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const Redis = require("ioredis");
const redisClient = new Redis(process.env.REDIS_URL);
const jwt = require("jsonwebtoken");

const Refresh = {
    getRefresh: async (req, res) => {
        const refreshToken = req.cookies.rt;
        if (!refreshToken) {
            return res.status(403).json({message: "Unauthorized"});
        }
        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
            // const redisUser = await redisClient.hGetAll(decodedRefreshToken.userId);
            const cashedUser = await redisClient.hgetall(decodedRefreshToken.userId);
            if (cashedUser?.user) {
                const user = JSON.parse(cashedUser.user);
                return res.status(200).json({message: "Token refreshed",user , token: cashedUser.token})
            }
            const user = await prisma.users.findUnique({
                where: {userId: decodedRefreshToken.userId},
            });
            user.userPassword = undefined;
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "10m",
            });
             await redisClient.hset(decodedRefreshToken.userId, {
                user: JSON.stringify(user),
                token,

            });
            await redisClient.expire(decodedRefreshToken.userId, 600);
            return res.status(200).json({message: "Token refreshed", user, token})
        } catch (err) {
            res.clearCookie("rt")
            return res.status(403).json({message: "Unauthorized"});
        }
    }

}
module.exports = Refresh;