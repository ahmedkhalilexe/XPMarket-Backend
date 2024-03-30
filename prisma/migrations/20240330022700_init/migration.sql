-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRoleId" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userRoleId" SERIAL NOT NULL,
    "userRoleName" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userRoleId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Items" (
    "itemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "itemPrice" DOUBLE PRECISION NOT NULL,
    "itemOldPrice" DOUBLE PRECISION NOT NULL,
    "itemCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "ItemCategories" (
    "itemCategoryId" SERIAL NOT NULL,
    "itemCategoryName" TEXT NOT NULL,

    CONSTRAINT "ItemCategories_pkey" PRIMARY KEY ("itemCategoryId")
);

-- CreateTable
CREATE TABLE "OrderedItems" (
    "orderedItemId" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "OrderedItems_pkey" PRIMARY KEY ("orderedItemId")
);

-- CreateTable
CREATE TABLE "ItemImages" (
    "itemImageId" TEXT NOT NULL,
    "itemImageUri" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "ItemImages_pkey" PRIMARY KEY ("itemImageId")
);

-- CreateTable
CREATE TABLE "UserCartItems" (
    "userCartItemId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserCartItems_pkey" PRIMARY KEY ("userCartItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userEmail_key" ON "Users"("userEmail");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("userRoleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_itemCategoryId_fkey" FOREIGN KEY ("itemCategoryId") REFERENCES "ItemCategories"("itemCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedItems" ADD CONSTRAINT "OrderedItems_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedItems" ADD CONSTRAINT "OrderedItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemImages" ADD CONSTRAINT "ItemImages_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCartItems" ADD CONSTRAINT "UserCartItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCartItems" ADD CONSTRAINT "UserCartItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
