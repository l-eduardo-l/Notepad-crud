-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notepad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Notepad" ("description", "id", "title") SELECT "description", "id", "title" FROM "Notepad";
DROP TABLE "Notepad";
ALTER TABLE "new_Notepad" RENAME TO "Notepad";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
