import { z} from 'zod';
import { id } from 'zod/locales';

export const EventSchema = z.object({
    id: z.number(),
    title: z.string().max(200),
    description: z.string().max(500),
    category: z.string().max(100),
    venue: z.string().max(200),
    city: z.string().max(100),
    eventDate: z.string(),
    price: z.string(),
    totalSeats: z.number(),
    imageURL: z.string().optional().nullable(), 
    createdAt: z.string(),
    updatedAt: z.string()
});