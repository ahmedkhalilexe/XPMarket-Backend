/*
  Warnings:

  - You are about to drop the `ItemCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderedItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCartItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemImages" DROP CONSTRAINT "ItemImages_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_itemCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedItems" DROP CONSTRAINT "OrderedItems_itemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedItems" DROP CONSTRAINT "OrderedItems_orderID_fkey";

-- DropForeignKey
ALTER TABLE "UserCartItems" DROP CONSTRAINT "UserCartItems_itemId_fkey";

-- DropForeignKey
ALTER TABLE "UserCartItems" DROP CONSTRAINT "UserCartItems_userId_fkey";

-- DropTable
DROP TABLE "ItemCategories";

-- DropTable
DROP TABLE "ItemImages";

-- DropTable
DROP TABLE "Items";

-- DropTable
DROP TABLE "OrderedItems";

-- DropTable
DROP TABLE "UserCartItems";

-- CreateTable
CREATE TABLE "Products" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productOldPrice" DOUBLE PRECISION NOT NULL,
    "productCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "itemCategoryId" SERIAL NOT NULL,
    "itemCategoryName" TEXT NOT NULL,

    CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("itemCategoryId")
);

-- CreateTable
CREATE TABLE "OrderedProducts" (
    "orderedItemId" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderedItemQuantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderedProducts_pkey" PRIMARY KEY ("orderedItemId")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "productImageId" TEXT NOT NULL,
    "productImageUri" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("productImageId")
);

-- CreateTable
CREATE TABLE "UserCartProducts" (
    "userCartProductId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userCartItemQuantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserCartProducts_pkey" PRIMARY KEY ("userCartProductId")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategories"("itemCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProducts" ADD CONSTRAINT "OrderedProducts_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProducts" ADD CONSTRAINT "OrderedProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCartProducts" ADD CONSTRAINT "UserCartProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCartProducts" ADD CONSTRAINT "UserCartProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
