const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Product = {
  addProduct: async (req, res) => {
    const {
      itemName,
      itemDescription,
      itemPrice,
      itemCategoryId,
      itemImagesUri,
    } = req.body;
    if (!itemName || !itemDescription || !itemPrice || !itemCategoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const item = await prisma.items.create({
      data: {
        itemName,
        itemDescription,
        itemPrice,
        itemOldPrice: itemPrice,
        itemCategoryId,
      },
    });
    if (item) {
      if (itemImagesUri) {
        itemImagesUri.forEach(async (itemImageUri) => {
          const itemImage = await prisma.itemImages.create({
            data: {
              itemImageUri: itemImageUri,
              itemId: item.itemId,
            },
          });
          if (!itemImage) {
            return res.status(400).json({ message: "Something went wrong" });
          }
        });
        return res.status(201).json({ message: "Item Added successfully" });
      }
      return res.status(201).json({ message: "Item Added successfully" });
    }
    return res.status(400).json({ message: "Something went wrong" });
  },
  updateProduct: async (req, res) => {
    const {
      itemId,
      itemName,
      itemDescription,
      itemPrice,
      itemCategoryId,
      itemImageUri,
    } = req.body;
    const item = await prisma.items.update({
      where: {
        itemId,
      },
      data: {
        itemName,
        itemDescription,
        itemPrice,
        itemCategoryId,
      },
    });
    // if (itemImageUri) {
    //   // const itemImage = await prisma.itemImages.update({
    //   //   where: {
    //   //     itemId,
    //   //   },
    //   //   data: {
    //   //     itemImageUri,
    //   //   },
    //   // });
    //   const itemImage = await prisma.itemImages.find
    //   if (!item && !itemImage) {
    //     res.status(400).json({ message: "Something went wrong" });
    //   }
    //   return res.status(201).json({ message: "Item updated successfully" });
    // }
    if (item) {
      return res.status(201).json({ message: "Item updated successfully" });
    }
    res.status(400).json({ message: "Something went wrong" });
  },

  deleteProduct: (req, res) => {},

  getProductById: async (req, res) => {
    const { itemId } = req.body;
    const product = await prisma.items.findUnique({
      where: {
        itemId,
      },
    });
    if (product) {
      const productImages = await prisma.itemImages.findMany({
        where: {
          itemId,
        },
      });
      if (productImages) {
        const formatedDate = {
          item: product,
          images: productImages,
        };
        return res.status(200).json(formatedDate);
      }
      return res.status(200).json({ item: product });
    }
    return res.status(400).json({ message: "No product found" });
  },

  getAllProducts: async (req, res) => {
    const allProducts =
      await prisma.$queryRaw`SELECT "Items".*, "ItemImages"."itemImageUri" from "Items" INNER JOIN "ItemImages" ON "ItemImages"."itemId" = "Items"."itemId"`;
    const formatedData = {};
    for (const row of allProducts) {
      const { itemId, itemImageUri, ...itemData } = row;
      if (!formatedData[itemId]) {
        formatedData[itemId] = { item: itemData, images: [] };
      }
      formatedData[itemId].images.push(row.itemImageUri);
    }
    res.status(200).json(formatedData);
  },

  getProductsByCategory: async (req, res) => {
    const { itemCategoryId } = req.body;
    const allProducts =
      await prisma.$queryRaw`SELECT "Items".*, "ItemImages"."itemImageUri" from "Items" INNER JOIN "ItemImages" ON "ItemImages"."itemId" = "Items"."itemId" WHERE "Items"."itemCategoryId" = ${itemCategoryId}`;
    const formatedData = {};
    for (const row of allProducts) {
      const { itemId, itemImageUri, ...itemData } = row;
      if (!formatedData[itemId]) {
        formatedData[itemId] = { item: itemData, images: [] };
      }
      formatedData[itemId].images.push(row.itemImageUri);
    }
    res.status(200).json(formatedData);
  },
};

module.exports = Product;
