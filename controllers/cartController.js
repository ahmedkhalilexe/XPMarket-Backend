const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = require("../models/productModel");
const formateData = require("../helpers/formateData");
const Cart = {
  addToCart: async (req, res) => {
    const { userId } = req.user;
    const { productId, userCartProductQuantity } = req.body;
    if (productId) {
      const cartProduct = await prisma.userCartProducts.create({
        data: {
          productId,
          userId,
          userCartProductQuantity,
        },
      });
      if (!cartProduct) {
        return res.status(403).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ message: "item added to cart" });
    }
    return res.status(403).json({ message: "No item to add to cart" });
  },
  deleteFromCart: async (req, res) => {
    const { userCartProductId } = req.body;
    const deletedCartProduct = await prisma.userCartProducts.delete({
      where: {
        userCartProductId,
      },
    });
    if (deletedCartProduct) {
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  },
  updateCartItem: async (req, res) => {
    const { userCartProductId, userCartProductQuantity } = req.body;
    const updatedCartProduct = await prisma.userCartProducts.update({
      where: {
        userCartProductId,
      },
      data: {
        userCartProductQuantity,
      },
    });
    if (updatedCartProduct) {
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  },
  getCart: async (req, res) => {
    const { userId } = req.user;
    const userCartProduct = await prisma.userCartProducts.findMany({
      where: {
        userId,
      },
    });
    const productList = [];
    for (const row of userCartProduct) {
      const product = await ProductModel.getProductById(row.productId);
      if (product) {
        const formatedData = formateData(product);
        // return res.status(200).json(formatedData);

        productList.push({
          userCartProductId: row.userCartProductId,
          product: formatedData[0],
          productQuantity: row.userCartProductQuantity,
        });
      }
    }
    return res.status(200).json(productList);
  },
};

module.exports = Cart;
