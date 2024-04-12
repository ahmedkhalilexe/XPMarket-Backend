/*
  Warnings:

  - The primary key for the `ProductCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemCategoryId` on the `ProductCategories` table. All the data in the column will be lost.
  - You are about to drop the column `itemCategoryName` on the `ProductCategories` table. All the data in the column will be lost.
  - Added the required column `productCategoryName` to the `ProductCategories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productCategoryId_fkey";

-- AlterTable
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_pkey",
DROP COLUMN "itemCategoryId",
DROP COLUMN "itemCategoryName",
ADD COLUMN     "productCategoryId" SERIAL NOT NULL,
ADD COLUMN     "productCategoryName" TEXT NOT NULL,
ADD CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("productCategoryId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategories"("productCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
