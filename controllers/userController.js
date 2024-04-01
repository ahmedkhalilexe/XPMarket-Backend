const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { json } = require("express");
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
          expiresIn: "5m",
        });
        res.cookie("t", token, {
          httpOnly: true,
        });
        return res.status(200).json({ message: "signed in successfully" });
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
    console.log(req.user);
    const allUsers = await prisma.users.findMany();
    return res.status(200).json(allUsers);
  },
  deleteUser: async (req, res) => {
    const { userId } = req.body;
    try {
      const deletedUser = await prisma.users.delete({
        where: {
          userId,
        },
      });
      if (userId == req.user.userId) {
        res.clearCookie("t");
      }
      return (
        res.sendStatus(200),
        json({
          userId,
          message: "User deleted successfully",
        })
      );
    } catch {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },
  userUpdate: (req, res) => {},
  userOrder: (req, res) => {},
};

module.exports = User;
