/*
  Warnings:

  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('PENDING', 'UPLOADING', 'PROCESSING', 'READY', 'ERROR');

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "url",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "s3Key" TEXT,
ADD COLUMN     "status" "VideoStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "thumbnail" TEXT;
