import { APIRequestContext, test as base } from '@playwright/test';
import { AuthClient } from '../api/clients/authClient';
import { createApiContext } from '../utils/apiContext';     
import { EventClient } from '../api/clients/eventClient';
import { BookingClient } from '../api/clients/bookingClient';



type Fixtures = {
  token: string;
  apiContext : APIRequestContext;
  eventClient : EventClient;
  bookingClient : BookingClient;
    event : any;

};

export const test = base.extend<Fixtures>({
    token : async ({}, use) => {
        const authClient  = new AuthClient();
        const loginResponse = await authClient.login({ 
            email: process.env.USER_EMAIL!, 
            password: process.env.USER_PASSWORD! 
        });
        const body = await loginResponse.json();
        console.log('Login response body:', body); // Debug log to check the response body  
        console.log('Received token:', body.token); // Debug log to check the token
        await use(body.token);

    },

    //API context fixture that creates a new API context for each test, using the token from the token fixture
    apiContext: async ({ token }, use) => {
        const apiContext = await createApiContext(token);
        await use(apiContext);
    },
    eventClient: async ({ apiContext }, use) => {
        const eventClient = new EventClient(apiContext);
        await use(eventClient);
    },
    bookingClient: async ({ apiContext }, use) => {
        const bookingClient = new BookingClient(apiContext);
        await use(bookingClient);
    },

    //Test event (auto create + cleanup)

   event: async ({ eventClient }: { eventClient: EventClient }, use: (value: any) => Promise<void>) => {
        // Create a test event before the test runs
        const createResponse = await eventClient.createEvent({
           title: 'Test fixture Event',
        description: 'This is a test event',
        category: 'Testing',
        venue: 'Online',
        city: 'Test City',
        eventDate: '2026-12-31T23:59:59.000Z',
        price: 1200,
        totalSeats: 100,
        imageURL: 'https://example.com/event-image.jpg'
        });
        const event = await createResponse.json();
        await use(event);

        // Cleanup: Delete the test event after the test completes
        await eventClient.deleteEvent(event.data.id);
    }
});

export { expect } from '@playwright/test';