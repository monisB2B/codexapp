import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Passw0rd!', 10);
  const user = await prisma.user.create({
    data: { username: 'demo', email: 'user@example.com', password },
  });
  const location = await prisma.location.create({
    data: { name: 'Warehouse', address: '123 St' },
  });
  await prisma.item.create({
    data: { sku: 'SKU1', name: 'Sample Item', qty: 10, locationId: location.id, userId: user.id },
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());

