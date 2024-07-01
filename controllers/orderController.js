const Order = {
    createOrder: async (req, res) => {
        const {orderedProducts} = req.body;
        try {
            const {userId} = req.user;
            await require("../models/orderModel").createOrder(userId, orderedProducts);
            return res.status(201).json({message: "Order created successfully."});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong couldn't create order."});
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
