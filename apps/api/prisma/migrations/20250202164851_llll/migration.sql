/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnss]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identity]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_phone_key" ON "Participant"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_cnss_key" ON "Participant"("cnss");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_identity_key" ON "Participant"("identity");
