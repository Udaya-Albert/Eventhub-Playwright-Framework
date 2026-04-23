import { test, expect } from '../../fixtures/baseFixture';

test('Cancel Booking and validate seats', async ({ event, bookingClient, eventClient }) => {

    

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

//Seats after booking
const mid  = await eventClient.getEventById(event.data.id);
const midSeats = (await mid.json()).data.availableSeats;

//Cancel booking
const cancelRes = await bookingClient.cancelBooking(booking.data.id);
expect(cancelRes.status()).toBe(200);

//Seats after cancellation
const afterCancel  = await eventClient.getEventById(event.data.id);
const afterCancelSeats = (await afterCancel.json()).data.availableSeats;
expect(afterCancelSeats).toBe(midSeats + tickets);

});