/*
  Warnings:

  - You are about to drop the column `source` on the `eventsPhotos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photo]` on the table `eventsPhotos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photo` to the `eventsPhotos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "eventsPhotos_source_key";

-- AlterTable
ALTER TABLE "eventsPhotos" DROP COLUMN "source",
ADD COLUMN     "photo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "eventsPhotos_photo_key" ON "eventsPhotos"("photo");
