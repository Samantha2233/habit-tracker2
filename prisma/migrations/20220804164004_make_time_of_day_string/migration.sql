/*
  Warnings:

  - Changed the type of `timeOfDay` on the `Habit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "timeOfDay",
ADD COLUMN     "timeOfDay" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TimeOfDay";
