const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jwt = require("jsonwebtoken");
const User = {
  signIn: async (req, res) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await prisma.users.findUnique({
      where: { userEmail },
    });
    if (user) {
      const compared = await bcrypt.compare(userPassword, user.userPassword);
      if (compared) {
        user.userPassword = undefined;
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        const refreshToken = jwt.sign({
          userId: user.userId,
        }, process.env.JWT_SECRET,{
            expiresIn: "1d",
        });
        res.cookie("rt", refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
          sameSite: "none",
            secure: true,
        });
        return res.status(200).json({ message: "signed in successfully",user ,token});
      } else {
        return res.status(403).json({ message: "Email or password incorrect" });
      }
    } else {
      return res.status(403).json({ message: "Email or password incorrect" });
    }
  },
  signOut: (req, res) => {
    res.clearCookie("t");
    res.clearCookie("rt");
    return res.status(200).json({ message: "Signed out" });
  },
  signUp: async (req, res) => {
    const { userEmail, userPassword, userFirstName, userLastName } = req.body;
    try {
      if (!userEmail || !userPassword || !userFirstName || !userLastName) {
        console.log(!userEmail);
        return res.status(400).json({ message: "Missing required fields" });
      }
      if (!emailRegex.test(userEmail)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      const user = await prisma.users.findUnique({
        where: { userEmail },
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(userPassword, salt);
      const newUser = await prisma.users.create({
        data: {
          userEmail,
          userPassword: hashedPassword,
          userFirstName,
          userLastName,
          userRoleId: 2,
        },
      });
      newUser.userPassword = undefined;
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: "Error creating user" });
    }
  },
  getAllUsers: async (req, res) => {
    const allUsers = await prisma.users.findMany();
    return res.status(200).json(allUsers);
  },
  deleteUser: async (req, res) => {
    const { userId } = req.body;
    try {
      await prisma.users.delete({
        where: {
          userId,
        },
      });
      if (userId === req.user.userId) {
        return res.clearCookie("t").status(200).json({ message: "User deleted" });
      }
      return res.status(200).json({ message: "User deleted" });
    } catch(error) {
      return res.status(400).json({ message: "Something went wrong", error });
    }
  },
  // userUpdate: (req, res) => {},
//   getUser : (req, res) => {
//   const user  = req.user;
//   return res.status(200).json(user);
// }
};

module.exports = User;
