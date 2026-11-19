-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "gender" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurements" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "headSize" TEXT,
    "agbadaShoulder" TEXT,
    "agbadaLength" TEXT,
    "shoulder" TEXT,
    "chest" TEXT,
    "neck" TEXT,
    "armHole" TEXT,
    "roundSleeve" TEXT,
    "sleeveLength" TEXT,
    "foreArm" TEXT,
    "clothLength" TEXT,
    "tommy" TEXT,
    "lapThigh" TEXT,
    "calf" TEXT,
    "trouserBase" TEXT,
    "cuffWrist" TEXT,
    "waist" TEXT,
    "knee" TEXT,
    "trouserLength" TEXT,
    "customerNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measurements_clientId_key" ON "measurements"("clientId");

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
