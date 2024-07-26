import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const OrgInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  whatsapp: z.string().min(8, 'WhatsApp is required'),
  email: z.string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  city: z.string().min(1, 'City is required')
});

export type OrgInput = z.infer<typeof OrgInputSchema>;
