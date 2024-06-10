const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = {
    addProduct: async (productName, productDescription, productPrice, productCategoryId, productImagesUri)=>{
        return prisma.products.create({
            data: {
                productName,
                productDescription,
                productPrice,
                productOldPrice: productPrice,
                productCategoryId,
                ProductImages: {
                    create: productImagesUri.map((productImageUri) => {
                        return {
                            productImageUri,
                        };
                    }),
                },

            }
        });
    },
    updateProduct: async (productId,productName,productDescription,productPrice,productCategoryId,ProductImages,currentTime)=>{
        await prisma.products.update({
            where: {
                productId,
            }, data: {
                productName, productDescription, productPrice, productCategoryId, productUpdatedAt: currentTime,
            },
        });
        if (ProductImages.length > 0) {
            await prisma.productImages.deleteMany({
                where: {
                    productId,
                },
            });

            await prisma.productImages.createMany({
                data: ProductImages.map((productImage) => {
                    return {
                        productImageUri: productImage.productImageUri, productId,
                    };

                }),
            });
        }

    },
    deleteProduct: async (productId)=>{
        await prisma.productImages.deleteMany({
            where: {
                productId,
            },
        });
        await prisma.userCartProducts.deleteMany({
            where: {
                productId,
            },
        });
        const orderedProducts = await prisma.orderedProducts.findMany({
            where: {
                productId,
            },
            include:{
                order:{
                    select:{
                        orderId:true,
                    }
                }
            }
        });
        await prisma.orderedProducts.deleteMany({
            where: {
                productId,
            },
        });
        await prisma.orders.deleteMany({
            where: {
                orderId: {
                    in: orderedProducts.map((orderedProduct) => {
                        return orderedProduct.orderID;
                    }),
                },
            },
        });
        await prisma.products.delete({
            where: {
                productId,
            },
        });
    },
    getProductById: async (productId) => {
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
    },
    getProductsByCategory: async (productCategoryId) => {
        return prisma.products.findMany({
            where: {
                productCategoryId,
            }, include: {
                ProductImages: {
                    select: {
                        productImageId: true, productImageUri: true,
                    },
                },
            },
        });
    },
    getOnSaleProducts: async () => {
        return prisma.products.findMany({
            take: 4,
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
            take:4,
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
