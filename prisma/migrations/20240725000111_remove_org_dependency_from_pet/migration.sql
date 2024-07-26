/*
  Warnings:

  - Added the required column `pets` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org` to the `Pet` table without a default value. This is not possible if the table is not empty.

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
    "password" TEXT NOT NULL,
    "pets" TEXT NOT NULL
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
    "org" TEXT NOT NULL
);
INSERT INTO "new_Pet" ("age", "city", "color", "id", "name", "orgId", "size") SELECT "age", "city", "color", "id", "name", "orgId", "size" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
