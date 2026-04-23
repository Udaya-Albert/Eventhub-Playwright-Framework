import { expect } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { EventClient } from '../../api/clients/eventClient';
import { title } from 'node:process';
import { EventSchema } from '../../utils/schemas/eventSchema';

test.describe('@event @smoke', () => { 
test('E2E Test for Event flow', async ({ token, eventClient }) => {
    

    //create
    const createResponse = await eventClient.createEvent({

        title: 'Test Event',
        description: 'This is a test event',
        category: 'Testing',
        venue: 'Online',
        city: 'Test City',
        eventDate: '2026-12-31T23:59:59.000Z',
        price: 1200,
        totalSeats: 100,
        imageURL: 'https://example.com/event-image.jpg'
    });
    expect(createResponse.status()).toBe(201);
    console.log('Create Event Response Status:', createResponse.status()); // Debug log to check the response status    
    const createdEvent = await createResponse.json();
    try
    {
        EventSchema.parse(createdEvent.data);
    }
    catch (error)
    {
        console.error('Validation error for created event:', error);
        throw error;
    }
    console.log('Created Event:', createdEvent); // Debug log to check the created event details    
    const eventId = createdEvent.data.id;
    console.log('Created Event ID:', eventId); // Debug log to check the created event ID

    //get all events
    //const getAllResponse = await eventClient.getEvents();
    //console.log('Get All Events Response Status:', getAllResponse.status()); // Debug log to check the response status for getting all events   
    //expect(getAllResponse.status()).toBe(200);
    //console.log('Get All Events Response Body:', await getAllResponse.json()); // Debug log to check the response body for getting all events   

    //get by id
    const getByIdResponse = await eventClient.getEventById(eventId);
    expect(getByIdResponse.status()).toBe(200);
    console.log('Get Event by ID Response Body:', await getByIdResponse.json()); // Debug log to check the response body for getting event by ID

    //update event
    const updateResponse = await eventClient.updateEvent(eventId, {
        title: 'Updated Test Event twice',
        description: 'This is an updated test event twice',
        category: 'Testing',
        venue: 'Online',
        city: 'Test City',
        eventDate: '2026-12-31T23:59:59.000Z',
        price: 1200,
        totalSeats: 100,
        imageURL: 'https://example.com/event-image.jpg'       
    });
    expect(updateResponse.status()).toBe(200);
    console.log('Update Event Response Body:', await updateResponse.json()); // Debug log to check the response body for updating event 
    const updatedEvent = await updateResponse.json();
    try
    {
        EventSchema.parse(updatedEvent.data);
    }
    catch (error)
    {
        console.error('Validation error for updated event:', error);
        throw error;
    }

    //delete event  
    const deleteResponse = await eventClient.deleteEvent(eventId);
    expect(deleteResponse.status()).toBe(200);
    console.log('Delete Event Response Body:', await deleteResponse.json()); // Debug log to check the response body for deleting event 
});
});