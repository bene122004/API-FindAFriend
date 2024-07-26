import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import fastifyJwt from '@fastify/jwt';
import { petRoutes } from './routes/petRoutes';
import { orgRoutes } from './routes/orgRoutes';
import { authRoutes } from './authenticator/authRoutes';

dotenv.config();

const app: FastifyInstance = Fastify({
    logger: true
});

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
        expiresIn: '1h'
    }
});

app.register(petRoutes);
app.register(orgRoutes);
app.register(authRoutes);

export { app };
