/*
  Warnings:

  - Added the required column `hour` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pix` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfer` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "hour" TEXT NOT NULL,
ADD COLUMN     "photo" BOOLEAN NOT NULL,
ADD COLUMN     "pix" BOOLEAN NOT NULL,
ADD COLUMN     "transfer" BOOLEAN NOT NULL;
