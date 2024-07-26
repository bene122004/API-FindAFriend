import { FastifyInstance } from 'fastify';
import { createOrgHandler, deleteOrgHandler, getOrgByIdHandler, listOrgsByCityHandler, listOrgsHandler, loginOrgHandler, updateOrgHandler } from '@controllers/orgController';

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgHandler);
  app.get('/orgs', listOrgsHandler);
  app.get('/orgs/:id', getOrgByIdHandler);
  app.put('/orgs/:id', updateOrgHandler);
  app.delete('/orgs/:id', deleteOrgHandler);
  app.get('/orgs/city', listOrgsByCityHandler);
  app.post('/orgs/login', loginOrgHandler);
}