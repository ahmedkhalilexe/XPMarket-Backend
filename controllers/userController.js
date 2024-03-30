const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      console.log(compared);
      if (compared) {
        user.userPassword = undefined;
        return res.status(200).json(user);
      } else {
        return res.status(403).json({ message: "Email or password incorrect" });
      }
    } else {
      return res.status(403).json({ message: "Email or password incorrect" });
    }
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
      const userFindMany = await prisma.users.findMany({
        where: { userEmail },
      });

      if (userFindMany.length > 0) {
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
      return res
        .status(400)
        .json({ message: "Error creating user", error: error.message });
    }
  },
  getAllUsers: (req, res) => {},
  deleteUser: (req, res) => {},
  userOrder: (req, res) => {},
};

module.exports = User;
