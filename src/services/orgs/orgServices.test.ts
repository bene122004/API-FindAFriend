import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createOrg, getOrgByEmail, getOrgsByCity } from '@services/orgs/orgServices';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('ORG Services', () => {
  beforeAll(async () => {
    await prisma.pet.deleteMany(); // Limpa a tabela de pets antes de rodar os testes
    await prisma.org.deleteMany(); // Limpa a tabela de orgs depois de limpar os pets
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve criar uma nova ORG', async () => {
    const orgData = {
      name: 'Test Org',
      address: '123 Test Street',
      whatsapp: '123456789',
      email: 'test@org.com',
      password: 'password123',
      city: 'Test City',
    };

    const org = await createOrg(orgData);
    expect(org).toHaveProperty('id');
    expect(org.email).toBe(orgData.email);
  });

  it('deve encontrar uma ORG pelo email', async () => {
    const email = 'test@org.com';
    const org = await getOrgByEmail(email);
    expect(org).toHaveProperty('id');
    expect(org?.email).toBe(email);
  });

  it('deve listar ORGs por cidade', async () => {
    const city = 'Test City';
    const orgs = await getOrgsByCity(city);
    expect(orgs.length).toBeGreaterThan(0);
    expect(orgs[0].city).toBe(city);
  });
});

