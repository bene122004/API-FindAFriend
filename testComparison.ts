import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';

const prisma = new PrismaClient();

async function checkPassword() {
  const email = 'example1@org.com';
  const password = 'password123';

  const org = await prisma.org.findUnique({
    where: { email },
  });

  if (!org) {
    console.log('Organization not found');
    return;
  }

  const storedHash = org.password;
  console.log('Stored Hash:', storedHash);

  const doesPasswordMatch = await compare(password, storedHash);
  if (!doesPasswordMatch) {
    console.log('Password does not match');
  } else {
    console.log('Password matches');
  }
}

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 6);
  console.log('Generated Hash:', hashedPassword);
  return hashedPassword;
}

// Hash a sample password and print it
hashPassword('password123').then(() => {
  // Check the password against the stored hash
  checkPassword().catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
});
