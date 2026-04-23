import { test, expect } from '../../fixtures/baseFixture';

test.describe('@e2e @critical', () => {
test('Full flow test: Create Event, Create Booking, Cancel Booking', async ({ event, eventClient, bookingClient }) => {

    //create booking
    const tickets = 2;
    const res = await bookingClient.createBooking({
    eventId: event.data.id,
    customerName: 'John Doe',
    customerEmail: 'example@gmail.com',
    customerPhone: '1234567890',
    quantity: tickets
});

const booking = await res.json();
console.log('Created Booking:', booking);

await bookingClient.cancelBooking(booking.data.id);

const delRes = await eventClient.deleteEvent(event.data.id);
expect(delRes.status()).toBe(200);
}); 
});
