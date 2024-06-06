const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = {
    getProductById: async (productId) => {
        //const product =
        //  await prisma.$queryRaw`SELECT "Products".*, "ProductImages"."productImageUri", "ProductImages"."productImageId" from "Products" INNER JOIN "ProductImages" ON "ProductImages"."productId" = "Products"."productId" WHERE "Products"."productId" = ${productId}`;
        return prisma.products.findUnique({
            where: {
                productId: productId,
            }, include: {
                ProductImages: {
                    select: {
                        productImageId: true, productImageUri: true,
                    },
                },
            },
        });
    },

    getAllProducts: async () => {
        return prisma.products.findMany({
            include: {
                ProductImages: {
                    select: {
                        productImageId: true, productImageUri: true,
                    },
                },
            },
        });
    }, getProductsByCategory: async (productCategoryId) => {
        return prisma.products.findMany({
            where: {
                productCategoryId: productCategoryId,
            }, include: {
                ProductImages: {
                    select: {
                        productImageId: true, productImageUri: true,
                    },
                },
            },
        });
    }, getOnSaleProducts: async () => {
        return prisma.products.findMany({
            where: {
                productOldPrice: {
                    gt: prisma.products.fields.productPrice,
                }
            }, include: {
                ProductImages: {
                    select: {
                        productImageId: true, productImageUri: true,
                    },
                },
            },
        });
    },
    getNewProducts: async () => {
        const getSevenDaysAgo = require('../helpers/getSevenDaysAgo');
        const sevenDaysAgo = getSevenDaysAgo();
        return prisma.products.findMany({
            where: {
                productCreatedAt: {
                    gt: sevenDaysAgo
                }
            }, include: {
                ProductImages: {
                    select: {
                        productImageId: true, productImageUri: true,
                    },
                },
            },
        });

    },
};

module.exports = ProductModel;
