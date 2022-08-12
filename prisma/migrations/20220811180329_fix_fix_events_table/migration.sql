/*
  Warnings:

  - You are about to drop the column `userId` on the `events` table. All the data in the column will be lost.
  - Added the required column `managerId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "events_userId_key";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "userId",
ADD COLUMN     "managerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
