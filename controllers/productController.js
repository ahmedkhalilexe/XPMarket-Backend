const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = require("../models/productModel");
const formateData = require("../helpers/formateData");

const Product = {
  addProduct: async (req, res) => {
    const {
      productName,
      productDescription,
      productPrice,
      productCategoryId,
      productImagesUri,
    } = req.body;
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategoryId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const product = await prisma.products.create({
      data: {
        productName,
        productDescription,
        productPrice,
        productOldPrice: productPrice,
        productCategoryId,
      },
    });
    if (product) {
      if (productImagesUri) {
        productImagesUri.forEach(async (productImageUri) => {
          const productImage = await prisma.productImages.create({
            data: {
              productImageUri: productImageUri,
              productId: product.productId,
            },
          });
          if (!productImage) {
            return res.status(400).json({ message: "Something went wrong" });
          }
        });
        return res.status(201).json({ message: "Item Added successfully" });
      }
      return res.status(201).json({ message: "Item Added successfully" });
    }
    return res.status(400).json({ message: "Something went wrong" });
  },
  updateProduct: async (req, res) => {
    const {
      productId,
      productName,
      productDescription,
      productPrice,
      productCategoryId,
      productImagesUri,
    } = req.body;
    const product = await prisma.products.update({
      where: {
        productId,
      },
      data: {
        productName,
        productDescription,
        productPrice,
        productPrice,
        productCategoryId,
      },
    });
    // if (itemImageUri) {
    //   // const itemImage = await prisma.itemImages.update({
    //   //   where: {
    //   //     itemId,
    //   //   },
    //   //   data: {
    //   //     itemImageUri,
    //   //   },
    //   // });
    //   const itemImage = await prisma.itemImages.find
    //   if (!item && !itemImage) {
    //     res.status(400).json({ message: "Something went wrong" });
    //   }
    //   return res.status(201).json({ message: "Item updated successfully" });
    // }
    if (product) {
      return res.status(201).json({ message: "Item updated successfully" });
    }
    res.status(400).json({ message: "Something went wrong" });
  },

  deleteProduct: (req, res) => {},

  getProductById: async (req, res) => {
    const { productId } = req.body;
    const product = await ProductModel.getProductById(productId);
    if (product) {
      const formatedData = formateData(product);
      return res.status(200).json(formatedData[0]);
    }
    return res.status(400).json({ message: "No product found" });
  },

  getAllProducts: async (req, res) => {
    const allProducts = await ProductModel.getAllProducts();
    const formatedData = formateData(allProducts);
    res.status(200).json(formatedData);
  },

  getProductsByCategory: async (req, res) => {
    const { productCategoryId } = req.body;
    const allProducts = await ProductModel.getProductsByCategory(
      productCategoryId
    );
    const formatedData = formateData(allProducts);
    res.status(200).json(formatedData);
  },
};

module.exports = Product;
