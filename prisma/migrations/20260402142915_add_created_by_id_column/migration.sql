/*
  Warnings:

  - Added the required column `createdById` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "records" ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "records_createdById_idx" ON "records"("createdById");

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
