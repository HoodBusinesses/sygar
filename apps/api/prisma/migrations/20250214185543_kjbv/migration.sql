-- CreateTable
CREATE TABLE "GroupAttendance" (
    "id" TEXT NOT NULL,
    "groupDateId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupAttendance" ADD CONSTRAINT "GroupAttendance_groupDateId_fkey" FOREIGN KEY ("groupDateId") REFERENCES "GroupDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupAttendance" ADD CONSTRAINT "GroupAttendance_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
