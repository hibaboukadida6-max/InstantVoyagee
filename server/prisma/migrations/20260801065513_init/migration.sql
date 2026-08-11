-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "destination" TEXT NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "passportNumber" TEXT,
    "airline" TEXT,
    "ticketNumber" TEXT,
    "ticketPrice" REAL NOT NULL,
    "amountPaid" REAL NOT NULL DEFAULT 0,
    "remaining" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
