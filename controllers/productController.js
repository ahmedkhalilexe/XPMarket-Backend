const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const ProductModel = require("../models/productModel");

const Product = {
    addProduct: async (req, res) => {
        const {
            productName, productDescription, productPrice, productCategoryId, productImagesUri,
        } = req.body;
        if (!productName || !productDescription || !productPrice || !productCategoryId) {
            return res.status(400).json({message: "Missing required fields"});
        }
        const product = await prisma.products.create({
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
        if (product) return res.status(201).json({message: "Item Added successfully"});
        return res.status(400).json({message: "Something went wrong"});
    },
    updateProduct: async (req, res) => {
        const currentTime = new Date();
        const {
            productId, productName, productDescription, productPrice, productCategoryId, ProductImages = [{}]
        } = req.body;
        try {
            const product = await prisma.products.update({
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

                const created = await prisma.productImages.createMany({
                    data: ProductImages.map((productImage) => {
                        return {
                            productImageUri: productImage.productImageUri, productId,
                        };

                    }),
                });
            }
            return res.status(201).json({message: "Product updated successfully."});

        } catch (err) {
            res.status(400).json({message: "Something went wrong could not update product.", error: err});
        }
    },

    deleteProduct: async (req, res) => {
        //TODO: Implement deleteProduct
        const {productId} = req.body;
        try {
            //ProductImages
            //UserCartProducts
            //OrderedProducts
            const deletedProductImages = await prisma.productImages.deleteMany({
                where: {
                    productId,
                },
            });
            const deletedUserCartProducts = await prisma.userCartProducts.deleteMany({
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
            const deletedOrderedProducts = await prisma.orderedProducts.deleteMany({
                where: {
                    productId,
                },
            });
            const deletedOrders = await prisma.orders.deleteMany({
                where: {
                    orderId: {
                        in: orderedProducts.map((orderedProduct) => {
                            return orderedProduct.orderID;
                        }),
                    },
                },
            });
            const product = await prisma.products.delete({
                where: {
                    productId,
                },
            });
            return res.status(200).json({message: "Product deleted successfully"});
        } catch (err) {
            return res.status(400).json({message: "Something went wrong", error: err});
        }

    },

    getProductById: async (req, res) => {
        const {productId} = req.body;
        const product = await ProductModel.getProductById(productId);
        if (product) {
            return res.status(200).json(product);
        }
        return res.status(400).json({message: "No product found"});
    },

    getAllProducts: async (req, res) => {
        const allProducts = await ProductModel.getAllProducts();
        res.status(200).json(allProducts);
    },

    getProductsByCategory: async (req, res) => {
        const {productCategoryId} = req.body;
        const allProducts = await ProductModel.getProductsByCategory(productCategoryId);
        res.status(200).json(allProducts);
    }, getOnSaleProducts: async (req, res) => {
        const allProducts = await ProductModel.getOnSaleProducts();
        res.status(200).json(allProducts);
    }, getNewProducts: async (req, res) => {
        const allProducts = await ProductModel.getNewProducts();
        res.status(200).json(allProducts);
    }
};


module.exports = Product;
