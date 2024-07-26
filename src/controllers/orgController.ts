//import bcrypt from 'bcryptjs'
import { FastifyRequest, FastifyReply } from 'fastify';
import { createOrg, getOrgById, getOrgByEmail, updateOrg, deleteOrg, getAllOrgs, getOrgsByCity } from '@services/orgs/orgServices';
import { OrgInput } from '@services/orgs/orgInput';
import { app } from 'src/app';

export async function loginOrgHandler(req: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' });
    }

    // Verificar org diretamente sem hash
    const org = await getOrgByEmail(email);

    if (!org) {
      return reply.status(400).send({ error: 'Invalid email or password' });
    }

    if (password !== org.password) {
      return reply.status(400).send({ error: 'Invalid email or password' });
    }

    // Gerar o token JWT
    const token = app.jwt.sign({ id: org.id, email: org.email });

    reply.status(200).send({ token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error during login:', errorMessage);
    reply.status(401).send({ error: 'Unauthorized' });
  }
}

export async function createOrgHandler(req: FastifyRequest<{ Body: OrgInput }>, reply: FastifyReply) {
  try {
    const {password} = req.body

    //const hashedPassword = await bcrypt.hash(password, 6)

    const orgData = {...req.body, password}

    const org = await createOrg(orgData);
    reply.status(201).send(org);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error creating org:', errorMessage);
    reply.status(500).send({ error: 'Unable to create org', message: errorMessage });
  }
}

export async function getOrgByIdHandler(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const org = await getOrgById(req.params.id);
    if (!org) {
      return reply.status(404).send({ error: 'ORG not found' });
    }
    reply.status(200).send(org);
  } catch (error) {
    reply.status(500).send({ error: 'Unable to fetch org' });
  }
}

export async function getOrgByEmailHandler(req: FastifyRequest<{ Querystring: { email: string } }>, reply: FastifyReply) {
  try {
    const { email } = req.query;
    const org = await getOrgByEmail(email);
    if (!org) {
      return reply.status(404).send({ error: 'ORG not found' });
    }
    reply.status(200).send(org);
  } catch (error) {
    reply.status(500).send({ error: 'Unable to fetch org' });
  }
}

export async function listOrgsByCityHandler(req: FastifyRequest<{ Querystring: { city: string } }>, reply: FastifyReply) {
  const { city } = req.query;
  
  try {
    if (!city) {
      return reply.status(400).send({ error: 'City is required' });
    }
    
    const orgs = await getOrgsByCity(city);
    if (orgs.length === 0) {
      return reply.status(404).send({ error: 'Organizations not found' });
    }
    
    reply.status(200).send(orgs);
  } catch (error) {
    console.error('Error fetching organizations by city:', error);
    reply.status(500).send({ error: 'Unable to fetch organizations' });
  }
}

export async function listOrgsHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const orgs = await getAllOrgs(); // Função para buscar todas as organizações
    reply.status(200).send(orgs);
  } catch (error) {
    console.error('Error fetching orgs:', error);
    reply.status(500).send({ error: 'Unable to fetch orgs' });
  }
}

export async function updateOrgHandler(req: FastifyRequest<{ Params: { id: string }, Body: Partial<OrgInput> }>, reply: FastifyReply) {
  try {
    const org = await updateOrg(req.params.id, req.body);
    if (!org) {
      return reply.status(404).send({ error: 'ORG not found' });
    }
    reply.status(200).send(org);
  } catch (error) {
    reply.status(500).send({ error: 'Unable to update org' });
  }
}

export async function deleteOrgHandler(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await deleteOrg(req.params.id);
    reply.status(204).send(); 
  } catch (error) {
    reply.status(500).send({ error: 'Unable to delete org' });
  }
}
