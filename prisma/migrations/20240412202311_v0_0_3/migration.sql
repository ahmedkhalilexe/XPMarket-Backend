/*
  Warnings:

  - You are about to drop the column `userCartItemQuantity` on the `UserCartProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserCartProducts" DROP COLUMN "userCartItemQuantity",
ADD COLUMN     "userCartProductQuantity" INTEGER NOT NULL DEFAULT 1;
