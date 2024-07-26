/*
  Warnings:

  - You are about to drop the column `pets` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the column `org` on the `Pet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Org" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Org" ("address", "email", "id", "name", "password", "whatsapp") SELECT "address", "email", "id", "name", "password", "whatsapp" FROM "Org";
DROP TABLE "Org";
ALTER TABLE "new_Org" RENAME TO "Org";
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "size" TEXT,
    "color" TEXT,
    "city" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("age", "city", "color", "id", "name", "orgId", "size") SELECT "age", "city", "color", "id", "name", "orgId", "size" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
