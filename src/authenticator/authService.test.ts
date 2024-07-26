import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { AuthService } from './authService';
import { OrgRepository } from '../repositories/orgRepository'; // Ajuste o caminho conforme necessário
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const orgRepository = new OrgRepository();
const authService = new AuthService(orgRepository);

describe('Auth Service', () => {
  beforeAll(async () => {
    await prisma.pet.deleteMany(); // Limpa a tabela de pets antes de rodar os testes
    await prisma.org.deleteMany(); // Limpa a tabela de orgs depois de limpar os pets

    await prisma.org.create({
      data: {
        name: 'Test Org',
        address: '123 Test Street',
        whatsapp: '123456789',
        email: 'test@org.com',
        password: 'password123',
        city: 'Test City',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve autenticar uma ORG com email e senha corretos', async () => {
    const email = 'test@org.com';
    const password = 'password123';
    const org = await authService.authenticate(email, password);
    expect(org).toHaveProperty('id');
    expect(org.email).toBe(email);
  });

  it('não deve autenticar uma ORG com email ou senha incorretos', async () => {
    const email = 'test@org.com';
    const password = 'wrongpassword';
    await expect(authService.authenticate(email, password)).rejects.toThrow('Invalid email or password');
  });
});
