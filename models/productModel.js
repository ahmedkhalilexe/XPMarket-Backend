const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = {
  getProductById: async (productId) => {
    const product =
      await prisma.$queryRaw`SELECT "Products".*, "ProductImages"."productImageUri", "ProductImages"."productImageId" from "Products" INNER JOIN "ProductImages" ON "ProductImages"."productId" = "Products"."productId" WHERE "Products"."productId" = ${productId}`;
    return product;
  },
  getAllProducts: async () => {
    const allProducts =
      await prisma.$queryRaw`SELECT "Products".*, "ProductImages"."productImageUri" from "Products" INNER JOIN "ProductImages" ON "ProductImages"."productId" = "Products"."productId"`;
    return allProducts;
  },
  getProductsByCategory: async (productCategoryId) => {
    const allProducts =
      await prisma.$queryRaw`SELECT "Products".*, "ProductImages"."productImageUri" from "Products" INNER JOIN "ProductImages" ON "ProductImages"."productId" = "Products"."productId" WHERE "Products"."productCategoryId" = ${productCategoryId}`;
    return allProducts;
  },
};

module.exports = ProductModel;
