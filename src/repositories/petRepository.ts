// Interagir com a DataBase
// src/repositories/petRepository.ts

import { PrismaClient } from '@prisma/client';
import { PetInput } from '@services/pets/petInput';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

export class PetRepository {
  static async create(data: PetInput) {
    return await prisma.pet.create({
      data: {
        name: data.name,
        age: data.age,
        size: data.size,
        color: data.color,
        orgId: data.orgId,
        city: data.city, 
      },
    });
  }

  static async findByCity(city: string) {
    return await prisma.pet.findMany({
      where: {
        city: {
          equals: city,
        },
      },
    });
  }

  static async findAll(city: string, filters: Partial<PetInput> = {}) {
    return await prisma.pet.findMany({
      where: {
        city: {
          contains: city.toLowerCase()
        },
        ...filters,
      },
    });
  }

  static async findUnique(id: string) {
    return await prisma.pet.findUnique({
      where: { id },
    });
  }

  static async update(id: string, data: Partial<PetInput>) {
    return await prisma.pet.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.pet.delete({
      where: { id },
    });
  }
}
