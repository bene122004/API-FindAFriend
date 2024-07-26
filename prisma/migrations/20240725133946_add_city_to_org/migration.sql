/*
  Warnings:

  - Added the required column `city` to the `Org` table without a default value. This is not possible if the table is not empty.

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
    "city" TEXT NOT NULL
);
INSERT INTO "new_Org" ("address", "email", "id", "name", "password", "whatsapp") SELECT "address", "email", "id", "name", "password", "whatsapp" FROM "Org";
DROP TABLE "Org";
ALTER TABLE "new_Org" RENAME TO "Org";
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
