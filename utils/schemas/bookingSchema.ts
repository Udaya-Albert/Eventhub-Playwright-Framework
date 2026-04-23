import {z} from 'zod';
import { EventSchema } from './eventSchema';

export const BookingSchema = z.object({
     id: z.number(),
  eventId: z.number(),
  userId: z.number(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  quantity: z.number(),
  totalPrice: z.string(),
  status: z.string(),
  bookingRef: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  event: EventSchema
});