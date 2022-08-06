/*
  Warnings:

  - Added the required column `userId` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RepeatStructure" AS ENUM ('Everyday', 'Day_Of_Week', 'Day_Of_Month', 'Times_Per_Week');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('Early_Morning', 'Late_Morning', 'Afternoon', 'Evening', 'Night');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
