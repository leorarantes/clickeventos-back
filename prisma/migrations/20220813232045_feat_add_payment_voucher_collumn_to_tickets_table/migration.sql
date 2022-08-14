/*
  Warnings:

  - A unique constraint covering the columns `[paymentVoucher]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentVoucher` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "paymentVoucher" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tickets_paymentVoucher_key" ON "tickets"("paymentVoucher");
