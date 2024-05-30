const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = {
  getProductById: async (productId) => {
    //const product =
    //  await prisma.$queryRaw`SELECT "Products".*, "ProductImages"."productImageUri", "ProductImages"."productImageId" from "Products" INNER JOIN "ProductImages" ON "ProductImages"."productId" = "Products"."productId" WHERE "Products"."productId" = ${productId}`;
    const product = await prisma.products.findUnique({
      where: {
        productId: productId,
      },
      include: {
        ProductImages: {
          select: {
            productImageId: true,
            productImageUri: true,
          },
        },
      },
    });
    return product;
  },

  getAllProducts: async () => {
    const allProducts = await prisma.products.findMany({
      include: {
        ProductImages: {
          select: {
            productImageId: true,
            productImageUri: true,
          },
        },
      },
    });
    return allProducts;
  },
  getProductsByCategory: async (productCategoryId) => {
    const allProducts = await prisma.products.findMany({
      where: {
        productCategoryId: productCategoryId,
      },
      include: {
        ProductImages: {
          select: {
            productImageId: true,
            productImageUri: true,
          },
        },
      },
    });

    return allProducts;
  },
};

module.exports = ProductModel;
