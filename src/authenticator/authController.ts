import { FastifyRequest, FastifyReply } from 'fastify';
import { OrgRepository } from '@repositories/orgRepository';
// Remover importação desnecessária
// import { compare } from 'bcryptjs';

const orgRepository = new OrgRepository();

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>, 
  reply: FastifyReply
) {
  try {
    const { email, password } = req.body;

    const org = await orgRepository.findByEmail(email);

    if (!org) {
      console.log('Organization not found');
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    // Comparar a senha diretamente sem hash
    if (password !== org.password) {
      console.log('Password does not match');
      return reply.status(401).send({ error: 'Invalid password' });
    }

    console.log('Password matches');

    // const token = jwtSign({ id: org.id });

    reply.send({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    reply.status(401).send({ error: 'Unauthorized' });
  }
}
