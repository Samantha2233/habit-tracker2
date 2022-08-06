-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('Early_Morning', 'Late_Morning', 'Afternoon', 'Evening', 'Night', 'Anytime');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "timeOfDay" "TimeOfDay" NOT NULL DEFAULT E'Anytime';
