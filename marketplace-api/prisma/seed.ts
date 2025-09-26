import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin Adm',
        email: 'admin@admin.com',
        password: await hash('000000', 10),
        phone: '00000000000',
        cpf: '00000000000',
        role: Role.ADMIN,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Básica',
        description: 'Camiseta 100% algodão, tamanho M',
        imageUrl: 'shirt1.jpg',
        price: 79.9,
      },
      {
        name: 'Camiseta Oversized',
        description: 'Camiseta para academia, tamanho G',
        imageUrl: 'shirt2.jpeg',
        price: 129.9,
      },
      {
        name: 'Calça Básica',
        description: 'Calça 100% algodão, tamanho M',
        imageUrl: 'pants1.webp',
        price: 229.9,
      },
      {
        name: 'Calça Street',
        description: 'Calça jogger, tamanho G',
        imageUrl: 'pants2.webp',
        price: 179.9,
      },
      {
        name: 'Tênis Feminino',
        description: 'Tênis feminino, tamanho 35',
        imageUrl: 'shoes1.webp',
        price: 199.9,
      },
      {
        name: 'Sapato elegante',
        description: 'Sapato elegante feminino, tamanho 37',
        imageUrl: 'shoes2.jpg',
        price: 399.9,
      },
    ],
    skipDuplicates: true,
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
