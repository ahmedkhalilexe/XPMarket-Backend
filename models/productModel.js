const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = {
  getProductById: async (itemId) => {
    const product =
      await prisma.$queryRaw`SELECT "Items".*, "ItemImages"."itemImageUri", "ItemImages"."itemImageId" from "Items" INNER JOIN "ItemImages" ON "ItemImages"."itemId" = "Items"."itemId" WHERE "Items"."itemId" = ${itemId}`;
    return product;
  },
  getAllProducts: async () => {
    const allProducts =
      await prisma.$queryRaw`SELECT "Items".*, "ItemImages"."itemImageUri" from "Items" INNER JOIN "ItemImages" ON "ItemImages"."itemId" = "Items"."itemId"`;
    return allProducts;
  },
  getProductsByCategory: async (itemCategoryId) => {
    const allProducts =
      await prisma.$queryRaw`SELECT "Items".*, "ItemImages"."itemImageUri" from "Items" INNER JOIN "ItemImages" ON "ItemImages"."itemId" = "Items"."itemId" WHERE "Items"."itemCategoryId" = ${itemCategoryId}`;
    return allProducts;
  },
};

module.exports = ProductModel;
