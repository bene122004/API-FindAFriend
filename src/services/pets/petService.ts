// aplicar regra de negócio 
// src/services/pets/petService.ts

import { PetRepository } from '@repositories/petRepository'; // Ajuste o caminho se necessário
import { PetInput } from '@services/pets/petInput';

export async function createPet(data: PetInput) {
  return await PetRepository.create(data);
}

export async function getPetsByCity(city: string) {
  return await PetRepository.findByCity(city);
}

export async function getPetById(id: string) {
  return await PetRepository.findUnique(id);
}

export async function getAllPets(city: string, filters: Partial<PetInput> = {}) {
  return await PetRepository.findAll(city, filters);
}

export async function updatePet(id: string, data: Partial<PetInput>) {
  return await PetRepository.update(id, data);
}

export async function deletePet(id: string) {
  return await PetRepository.delete(id);
}
