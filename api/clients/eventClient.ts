import { APIRequestContext } from "@playwright/test";
import { createApiContext } from "../../utils/apiContext";

export class EventClient {

    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async createEvent(payload : any) {
        
        return this.apiContext.post('/api/events', {
            data: payload
        });
    }

    async getEvents() {
        return  this.apiContext.get('/api/events');
    }

    async getEventById(id : string) {
       
        return await this.apiContext.get(`/api/events/${id}`);
    }

    async updateEvent(id : string, payload : any) {
        
        return await this.apiContext.put(`/api/events/${id}`, {
            data: payload
        });
    }

    async deleteEvent(id : string) {
        return await this.apiContext.delete(`/api/events/${id}`);
    }
}