/*
  Warnings:

  - Made the column `organizationId` on table `Theme` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_organizationId_fkey";

-- AlterTable
ALTER TABLE "Theme" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
