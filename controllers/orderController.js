const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = {
    createOrder: async (req, res) => {
        const {orderedProducts} = req.body;
        const formattedOrderedProducts = orderedProducts.map((orderedProduct) => {
            return {
                productId: orderedProduct.productId,
                orderedItemQuantity: orderedProduct.quantity,
            };
        });
        try {
            const {userId} = req.user;
            const order = await require("../models/orderModel").createOrder(userId, formattedOrderedProducts).then((order)=>order);
            const lineItems = orderedProducts.map((orderedProduct) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: orderedProduct.productName,
                            images: [orderedProduct.ProductImages[0].productImageUri],
                        },
                        unit_amount: orderedProduct.productPrice * 100,
                    },
                    quantity: orderedProduct.quantity,
                };
            });
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                payment_intent_data:{
                    metadata: {
                        orderId: order.orderId,
                    }
                },
                metadata:{
                    orderId: order.orderId,
                },
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
                expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 minutes from now
            });
            return res.status(201).json({message: "Order created successfully.", session});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't create order.", error});
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const allOrders = await require("../models/orderModel").getAllOrders();
            return res.status(200).json(allOrders);
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't get orders."});
        }
    },

    getAllOrdersByUser: async (req, res) => {
        const {userId} = req.user;
        try {
            const allOrders = await require("../models/orderModel").getAllOrdersByUser(userId)
            return res.status(200).json(allOrders);
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't get orders."});
        }
    },

    getOrderById: async (req, res) => {
        const {orderId} = req.body;
        try {
            const order = await require("../models/orderModel").getOrderById(orderId);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't get order."});
        }
    },

    updateOrder: async (req, res) => {
        const {orderId,orderStatus,orderedItemId, orderedItemQuantity} = req.body;
        try {
             await require("../models/orderModel").updateOrder(orderId,orderStatus,orderedItemId, orderedItemQuantity);
            return res.status(200).json({message: "Order updated successfully."});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't update order."});
        }
    },

    deleteOrder: async (req, res) => {
        const {orderId} = req.body;
        try {
            await require("../models/orderModel").deleteOrder(orderId);
            return res.status(200).json({message: "Order deleted successfully."});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't delete order.", error});
        }
    },

    getTotalRevenue: async (req, res) => {
        try {
            const totalRevenue = await require("../models/orderModel").getTotalRevenue();
            return res.status(200).json(totalRevenue);
        } catch (error) {
            return res.status(400).json({message: "Something went wrong"});
        }
    },

    getTotalOrders: async (req, res) => {
        try {
            const totalOrders = await require("../models/orderModel").getTotalOrders();
            return res.status(200).json(totalOrders);
        } catch (error) {
            return res.status(400).json({message: "Something went wrong"});
        }
    },

    getRecentOrders: async (req, res) =>{
        try {
            const recentOrders = await require("../models/orderModel").getRecentOrders();
            return res.status(200).json(recentOrders);
        } catch (error) {
            return res.status(400).json({message: "Something went wrong"});
        }
    }

};
module.exports = Order;
