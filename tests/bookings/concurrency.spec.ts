import { test, expect  } from '../../fixtures/baseFixture';


test('@booking @concurrency prevent overbooking', async ( {event, bookingClient, eventClient} ) => {

const totalSeats = 100;
const tickets = 10;

console.log('Event ID:', event.data.id);
  console.log('Event available seats:', event.data.availableSeats);

 

//create parallel bookings
    const requests = Array.from({ length: 3}, (_,i) =>
        bookingClient.createBooking({
            eventId: event.data.id,
            customerName: `User ${i}`,
      customerEmail: `user${Date.now()}_${i}@example.com`, 
      customerPhone: `999999999${i}`, 
            quantity: tickets
        })
    );

     const results = await Promise.allSettled(requests);  
    // DEBUG: Log response bodies
for (let i = 0; i < results.length; i++) {
  if (results[i].status === 'fulfilled') {
    const res = (results[i] as PromiseFulfilledResult<any>).value;
    console.log(`Request ${i} Status:`, res.status());
    if (res.status() !== 201) {
      const body = await res.json();
      console.log(`Request ${i} Error Response:`, body);
    }
  }
}
 

     // Count successful bookings
     const successfulBookings = results.filter(res => res.status === 'fulfilled' && res.value.status() === 201).length;
     const failedBookings = results.length - successfulBookings;
    
    console.log('Successful:', successfulBookings, 'Failed:', failedBookings);
  
    // Validate no overbooking (core business rule)
    expect(successfulBookings * tickets).toBeLessThanOrEqual(totalSeats);

    // Verify seats were reduced correctly
    const after = await eventClient.getEventById(event.data.id);
    expect(after.status()).toBe(200);
    const afterSeats = (await after.json()).data.availableSeats;
    expect(afterSeats).toBe(totalSeats - (successfulBookings * tickets)); // Only one booking of 30 seats should be successful
}); 