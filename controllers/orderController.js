const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Order = {
  createOrder: async (req, res) => {
    const { orderedItems } = req.body;
    const { userId } = req.user;
    const userOrder = await prisma.orders.create({
      data: {
        userId,
        orderStatus: "OK",
      },
    });
    if (userOrder) {
      for (const item of orderedItems) {
        const orderedItem = await prisma.orderedItems.create({
          data: {
            itemId: item.itemId,
            orderID: userOrder.orderId,
            orderedItemQuantity: item.itemQuantity,
          },
        });
        if (!orderedItem) {
          return res.sendStatus(400);
        }
      }
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  },
};
module.exports = Order;
