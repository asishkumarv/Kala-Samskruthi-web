import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('User model:', !!prisma.user);
  console.log('SiteContent model:', !!prisma.siteContent);
}

main().catch(console.error);
