-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "pictureKey" TEXT;
