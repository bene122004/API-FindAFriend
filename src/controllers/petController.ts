import { FastifyRequest, FastifyReply } from 'fastify';
import { createPet, getPetById, getAllPets, updatePet, deletePet, getPetsByCity } from '@services/pets/petService';
import { PetInput } from '@services/pets/petInput';

// Função para verificar o token de autenticação
async function verifyOrgToken(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
}

// Handler para criar um novo pet, requer autenticação
export async function createPetHandler(
  req: FastifyRequest<{ Body: PetInput }>,
  reply: FastifyReply
) {
 // await verifyOrgToken(req, reply);
 // if (reply.sent) return; // Verifica se a resposta já foi enviada

  try {
    const { name, city, orgId } = req.body;
    if (!name || !city || !orgId) {
      return reply.status(400).send({ error: 'Missing required fields: name, city, orgId' });
    }

    const pet = await createPet(req.body);
    reply.status(201).send(pet);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error creating pet:', errorMessage);
    reply.status(500).send({ error: 'Unable to create pet', message: errorMessage });
  }
}

export async function getPetsByCityHandler(req: FastifyRequest<{ Querystring: { city: string } }>, reply: FastifyReply) {
  try {
    const { city } = req.query;
    const pets = await getPetsByCity(city);
    reply.status(200).send(pets);
  } catch (error) {
    reply.status(500).send({ error: 'Error fetching pets by city' });
  }
}

// Handler para obter os detalhes de um pet por ID, não requer autenticação
export async function getPetByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const pet = await getPetById(req.params.id);
    if (!pet) {
      return reply.status(404).send({ error: 'Pet not found' });
    }
    reply.status(200).send(pet);
  } catch (error) {
    reply.status(500).send({ error: 'Unable to fetch pet' });
  }
}

// 
export async function listPetsHandler(
  req: FastifyRequest<{ Querystring: { city: string; age?: number; size?: string; color?: string } }>,
  reply: FastifyReply
) {
  try {
    const { city, age, size, color } = req.query;

    if (!city) {
      return reply.status(400).send({ error: 'City is required' });
    }

    const filters = { age, size, color };
    const pets = await getAllPets(city, filters);
    reply.status(200).send(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    reply.status(500).send({ error: 'Unable to fetch pets' });
  }
}

// Handler para atualizar um pet por ID, requer autenticação
export async function updatePetHandler(
  req: FastifyRequest<{ Params: { id: string }; Body: Partial<PetInput> }>,
  reply: FastifyReply
) {
  await verifyOrgToken(req, reply);
  if (reply.sent) return;

  try {
    const pet = await updatePet(req.params.id, req.body);
    if (!pet) {
      return reply.status(404).send({ error: 'Pet not found' });
    }
    reply.status(200).send(pet);
  } catch (error) {
    reply.status(500).send({ error: 'Unable to update pet' });
  }
}

// Handler para deletar um pet por ID, requer autenticação
export async function deletePetHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  await verifyOrgToken(req, reply);
  if (reply.sent) return;

  try {
    const pet = await deletePet(req.params.id);
    if (!pet) {
      return reply.status(404).send({ error: 'Pet not found' });
    }
    reply.status(204).send(); // No Content
  } catch (error) {
    reply.status(500).send({ error: 'Unable to delete pet' });
  }
}
