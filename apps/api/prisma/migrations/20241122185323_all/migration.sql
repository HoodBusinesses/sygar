-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ORGANIZATION_USER', 'SOLUTION_OWNER');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('CIN', 'Passport', 'Permit');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Owner', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "AbilityScope" AS ENUM ('Organization', 'Solution');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cnss" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT,
    "passwordChangedAt" TIMESTAMP(3),
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "role" "Role" NOT NULL,
    "type" "UserType" NOT NULL,
    "identityType" "IdentityType" NOT NULL,
    "identity" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnss_key" ON "User"("cnss");
