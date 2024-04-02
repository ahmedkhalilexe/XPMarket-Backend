const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = require("../models/productModel");
const formateData = require("../helpers/formateData");
const Cart = {
  addToCart: async (req, res) => {
    const { userId } = req.user;
    const { itemId, userCartItemQuantity } = req.body;
    if (itemId) {
      const cartItem = await prisma.userCartItems.create({
        data: {
          itemId,
          userId,
          userCartItemQuantity,
        },
      });
      if (!cartItem) {
        return res.status(403).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ message: "item added to cart" });
    }
    return res.status(403).json({ message: "No item to add to cart" });
  },
  deleteFromCart: (req, res) => {},
  updateCart: (req, res) => {},
  getCart: async (req, res) => {
    const { userId } = req.user;
    const userCartItems = await prisma.userCartItems.findMany({
      where: {
        userId,
      },
    });
    const itemsList = [];
    for (const row of userCartItems) {
      const item = await ProductModel.getProductById(row.itemId);
      if (item) {
        const formatedData = formateData(item);
        itemsList.push({
          item: formatedData[row.itemId],
          itemQuantity: row.userCartItemQuantity,
        });
      }
    }
    return res.status(200).json(itemsList);
  },
};

module.exports = Cart;
