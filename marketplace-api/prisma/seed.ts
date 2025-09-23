import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  if (users.length > 0) {
    console.log('Users already exist, skipping seeding.');
    return;
  }

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@doe.com',
      password: await hash('000000', 10),
      phone: '00000000000',
      cpf: '00000000000',
      role: Role.ADMIN,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
