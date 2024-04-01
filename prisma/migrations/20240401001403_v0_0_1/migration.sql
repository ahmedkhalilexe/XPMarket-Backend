-- AlterTable
ALTER TABLE "OrderedItems" ADD COLUMN     "orderedItemQuantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "UserCartItems" ADD COLUMN     "userCartItemQuantity" INTEGER NOT NULL DEFAULT 1;
