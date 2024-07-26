
import { FastifyInstance } from 'fastify';
import { createPetHandler, listPetsHandler, getPetByIdHandler, updatePetHandler, deletePetHandler, getPetsByCityHandler } from '@controllers/petController';

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', createPetHandler);
  app.get('/pets', getPetsByCityHandler);
  app.get('/pets/:id', getPetByIdHandler);
  app.put('/pets/:id', updatePetHandler);
  app.delete('/pets/:id', deletePetHandler);
}
