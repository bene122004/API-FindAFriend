import { PrismaClient } from '@prisma/client';
import { OrgInput } from '@services/orgs/orgInput';
// Remover importação desnecessária
// import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export class OrgRepository {
  async create(data: OrgInput) {
    const existingOrg = await prisma.org.findUnique({
      where: { email: data.email },
    });

    if (existingOrg) {
      throw new Error('Organization with this email already exists');
    }

    // Certifique-se de que a senha não está sendo hashada
    return await prisma.org.create({
      data,
    });
  }

  async findUnique(id: string) {
    return await prisma.org.findUnique({
      where: { id },
    });
  }

  async findByCity(city: string) {
    return prisma.org.findMany({
      where: {
        city: {
          contains: city.toLowerCase()
        }
      }
    });
  }

  async findByEmail(email: string) {
    return await prisma.org.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return prisma.org.findMany();
  }

  async update(id: string, data: Partial<OrgInput>) {
    return await prisma.org.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.org.delete({
      where: { id },
    });
  }
}
