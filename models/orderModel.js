const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const orderModel = {
    createOrder: (userId, orderedProducts) => {
        return prisma.orders.create({
            data: {
                userId, orderStatus: "PENDING",
                OrderedProducts: {
                    create: orderedProducts
                }
            },
        });
    },

    getAllOrders: () => {
        return prisma.orders.findMany({
            include: {
                OrderedProducts: {
                    select: {
                        orderedItemQuantity: true, product: {
                            select: {
                                productId: true,
                                productName: true,
                                productPrice: true,
                                productDescription: true,
                                productCategoryId: true,
                                ProductImages: {
                                    select: {
                                        productImageUri: true,
                                    },
                                },
                            },
                        },
                    }

                }
            }
        })
    },

    getAllOrdersByUser: (userId) => {
        return prisma.orders.findMany({
            where: {
                userId
            }, include: {
                OrderedProducts: {
                    select: {
                        orderedItemQuantity: true, product: {
                            select: {
                                productId: true,
                                productPrice: true,
                            },
                        },
                    }

                }
            }
        })
    },

    getOrderById: (orderId) => {
        return prisma.orders.findUnique({
            where: {
                orderId
            },
            include: {
                OrderedProducts: {
                    select: {
                        orderedItemQuantity: true, product: {
                            select: {
                                productId: true,
                                productName: true,
                                productPrice: true,
                                productDescription: true,
                                productCategoryId: true,
                                ProductImages: {
                                    select: {
                                        productImageUri: true,
                                    },
                                },
                            },
                        },
                    }

                }
            }

        })
    },

    updateOrder: (orderId,orderStatus,orderedItemId, orderedItemQuantity) => {
        if(!orderedItemId && !orderedItemQuantity){
            return prisma.orders.update({
                where: {
                    orderId
                },
                data: {
                    orderStatus
                }
            })
        }
        return prisma.orders.update({
            where: {
                orderId
            },
            data: {
                orderStatus,
                updatedAt: new Date(),
                OrderedProducts: {
                    update: {
                        where: {
                            orderedItemId
                        },
                        data: {
                            orderedItemQuantity
                        }
                    }
                }
            }
        })
    },

    deleteOrder: async (orderId) => {
        await  prisma.orderedProducts.deleteMany({
            where: {
                orderID : orderId
            }
        })
        return  prisma.orders.delete({
            where: {
                orderId
            },
            include:{
                OrderedProducts: true
            }
        })
    },

    getTotalRevenue:async ()=>{
        const allOrders = await prisma.orders.findMany({
            include: {
                OrderedProducts: {
                    select: {
                        orderedItemQuantity: true, product: {
                            select: {
                                productPrice: true,
                            },
                        },
                    }

                }
            }
        });
        let totalRevenue = 0;
        allOrders.forEach(order => {
            order.OrderedProducts.forEach(orderedProduct => {
                totalRevenue += orderedProduct.orderedItemQuantity * orderedProduct.product.productPrice;
            })
        });
        return totalRevenue;
    },

    getTotalOrders: async ()=>{
        return prisma.orders.count();
    },

    getRecentOrders: async ()=>{
        return prisma.orders.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 6,
            include: {
                user: {
                    select: {
                        userFirstName: true,
                        userLastName: true,
                        userEmail: true,
                    }
                },
                OrderedProducts: {
                    select: {
                        orderedItemQuantity: true,
                        product: {
                            select: {
                                productId: true,
                                productPrice: true,
                            },
                        },
                    }

                }
            },
        });

    }
}
module.exports = orderModel;