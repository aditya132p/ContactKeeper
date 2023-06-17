/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_email_key" ON "Card"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Card_phone_key" ON "Card"("phone");
