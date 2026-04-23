
import { test, expect  } from '../../fixtures/baseFixture';
import { BookingClient } from '../../api/clients/bookingClient';
import { EventClient } from '../../api/clients/eventClient';
import { BookingSchema } from '../../utils/schemas/bookingSchema';
import data from '../../testData/bookingData.json';

for (const d of data as Array<any>) {
test.describe( '@booking @regression', () => { 
test(`Booking flow for ${d.customerName}`, async ({ event, bookingClient, eventClient }) => {
  
//Before seats
const before  = await eventClient.getEventById(event.data.id);
const beforeSeats = (await before.json()).data.availableSeats;

//create booking


const res = await bookingClient.createBooking({
    eventId: event.data.id,
    customerName: d.customerName,
    customerEmail: d.customerEmail,
    customerPhone: d.customerPhone,
    quantity: d.quantity
});

expect(res.status()).toBe(201);
const booking = await res.json();
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

// Verify seats were reduced
      const after = await eventClient.getEventById(event.data.id);
      const afterSeats = (await after.json()).data.availableSeats;
      expect(afterSeats).toBe(beforeSeats - d.quantity);

// Cleanup      
await bookingClient.cancelBooking(booking.data.id);

const delRes = await eventClient.deleteEvent(event.data.id);
expect(delRes.status()).toBe(200);

});
});
}
