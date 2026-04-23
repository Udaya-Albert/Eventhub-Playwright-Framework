
import { test, expect  } from '../../fixtures/baseFixture';
import { BookingClient } from '../../api/clients/bookingClient';
import { EventClient } from '../../api/clients/eventClient';
import { BookingSchema } from '../../utils/schemas/bookingSchema';

test.describe( '@booking @regression', () => { 
test('Create Booking and validate seats + price', async ({ event, bookingClient, eventClient }) => {
  
//Before seats
const before  = await eventClient.getEventById(event.data.id);
const beforeSeats = (await before.json()).data.availableSeats;
let booking : any;
const tickets = 2;
//create booking
await test.step('Booking tickets and validating response', async () => {

const res = await bookingClient.createBooking({
    eventId: event.data.id,
    customerName: 'John Doe',
    customerEmail: 'example@gmail.com',
    customerPhone: '1234567890',
    quantity: tickets
});

expect(res.status()).toBe(201);
 booking = await res.json();
console.log('Created Booking:', booking);
 try
    {
        BookingSchema.parse(booking.data);
    }
    catch (error)
    {
        console.error('Validation error for created booking:', error);
        throw error;
    }
});

//Validate booking reference
await test.step('Validating booking reference format', async () => {
const reference = booking.data.bookingRef;
expect(reference).toMatch(/^T-[A-Z0-9]{6}$/); // Assuming the reference format is T- followed by 6 digits 
console.log('Booking Reference:', reference);
});


//After Seats
await test.step('Validating available seats after booking', async () => {
const after  = await eventClient.getEventById(event.data.id);
const afterSeats = (await after.json()).data.availableSeats;
expect(afterSeats).toBe(beforeSeats - tickets);
})
});
});
