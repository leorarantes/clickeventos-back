/*
  Warnings:

  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `pix` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `transfer` on the `events` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "date",
DROP COLUMN "hour",
DROP COLUMN "photo",
DROP COLUMN "pix",
DROP COLUMN "transfer",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "eventsPhotos" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventsPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventsPix" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventsPix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventsBankAccounts" (
    "id" SERIAL NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventsBankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bankAccountsCpf" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bankAccountsCpf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "eventsPhotos_source_key" ON "eventsPhotos"("source");

-- AddForeignKey
ALTER TABLE "eventsPhotos" ADD CONSTRAINT "eventsPhotos_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventsPix" ADD CONSTRAINT "eventsPix_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventsBankAccounts" ADD CONSTRAINT "eventsBankAccounts_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankAccountsCpf" ADD CONSTRAINT "bankAccountsCpf_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "eventsBankAccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
