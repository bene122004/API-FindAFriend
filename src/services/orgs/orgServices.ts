import { OrgRepository } from '@repositories/orgRepository';
import { OrgInput } from './orgInput';
// Remover importação desnecessária
// import { compare, hash } from 'bcryptjs';

const orgRepository = new OrgRepository();

export async function createOrg(data: OrgInput) {
  // Remover a hash da senha temporariamente
  const orgData = { ...data }; // Sem hash
  return orgRepository.create(orgData); // Enviar o objeto sem a senha hash
}

export async function getOrgsByCity(city: string) {
  return await orgRepository.findByCity(city);
}

export async function getOrgById(id: string) {
  return await orgRepository.findUnique(id);
}

export async function getOrgByEmail(email: string) {
  return await orgRepository.findByEmail(email);
}

export async function getAllOrgs() {
  return await orgRepository.findAll();
}

export async function updateOrg(id: string, data: Partial<OrgInput>) {
  return await orgRepository.update(id, data);
}

export async function deleteOrg(id: string) {
  return await OrgRepository.delete(id);
}

// Remover funções relacionadas à validação de senha
// export async function validateOrgPassword(email: string, password: string) {
//   const org = await getOrgByEmail(email);
//   if (!org) {
//     throw new Error('Organization not found');
//   }
  
//   const isPasswordValid = await compare(password, org.password);
//   if (!isPasswordValid) {
//     throw new Error('Invalid password');
//   }
  
//   return org;
// }
