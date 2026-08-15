import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./prisma.js";

async function main() {
  const email = "employe@instantvoyagee.com";
  const password = "12345678";

  // Vérifier si le compte existe déjà
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    console.log("⚠️ Le compte existe déjà.");
    console.log("Email :", existingUser.email);
    console.log("Rôle :", existingUser.role);
    return;
  }

  // Chiffrer le mot de passe
  const passwordHash = await bcrypt.hash(password, 10);

  // Créer le compte employé
  const user = await prisma.user.create({
    data: {
      fullName: "Employé InstantVoyagee",
      email,
      passwordHash,
      role: "EMPLOYEE",
      active: true,
    },
  });

  console.log("");
  console.log("================================");
  console.log("✅ COMPTE CRÉÉ");
  console.log("================================");
  console.log("Nom :", user.fullName);
  console.log("Email :", user.email);
  console.log("Mot de passe :", password);
  console.log("Rôle :", user.role);
  console.log("================================");
  console.log("");
}

main()
  .catch((error) => {
    console.error("❌ Erreur création utilisateur :");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });