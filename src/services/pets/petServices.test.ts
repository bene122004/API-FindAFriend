import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createPet, getPetsByCity } from '@services/pets/petService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Pet Services', () => {
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

  it('deve criar um novo pet', async () => {
    const org = await prisma.org.findUnique({ where: { email: 'test@org.com' } });
    const petData = {
      name: 'Test Pet',
      age: 2,
      species: 'Dog',
      orgId: org?.id as string,
      city: 'Test City', // Inclua a propriedade city obrigatória
      size: 'Medium', // Adicione outras propriedades opcionais conforme necessário
      color: 'Brown'
    };

    const pet = await createPet(petData);
    expect(pet).toHaveProperty('id');
    expect(pet.name).toBe(petData.name);
  });

  it('deve listar pets por cidade', async () => {
    const city = 'Test City';
    const pets = await getPetsByCity(city);
    expect(pets.length).toBeGreaterThan(0);
  });
});
