
import { PrismaClient } from '@prisma/client';
// Remova importação desnecessária
// import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

interface AuthServiceRequest {
  email: string;
  password: string;
}

export class AuthService {
  async authenticate({ email, password }: AuthServiceRequest) {
    const user = await prisma.org.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Comparar a senha diretamente sem hash
    if (password !== user.password) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
