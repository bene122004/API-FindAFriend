import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const newOrg = await prisma.org.create({
      data: {
        name: 'Test Org',
        address: '123 Test St',
        whatsapp: '123456789',
        email: 'test@org.com',
        password: 'securepassword'
      },
    });
    console.log('Organization created:', newOrg);
  } catch (error) {
    console.error('Error creating organization:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
