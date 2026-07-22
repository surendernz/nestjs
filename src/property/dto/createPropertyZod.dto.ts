import { z } from 'zod';

export const createPropertyZodSchema = z.object({
    name: z.string().min(3, { message: 'ZOD: Name must be at least 3 characters long' }).max(50, { message: 'Name must be at most 50 characters long' }),
    description: z.string().min(10, { message: 'ZOD: Description must be at least 10 characters long' }).max(200, { message: 'Description must be at most 200 characters long' }),
    price: z.number().int({ message: 'ZOD: Price must be an integer' }).positive({ message: 'Price must be a positive number' }),
}).required();

export type CreatePropertyZodDto = z.infer<typeof createPropertyZodSchema>;