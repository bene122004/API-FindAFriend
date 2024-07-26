
import { FastifyInstance } from 'fastify';
import { loginHandler } from './authController'; 

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/login', loginHandler);
}
