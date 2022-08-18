/*
  Warnings:

  - You are about to drop the column `dateTime` on the `events` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "dateTime",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
