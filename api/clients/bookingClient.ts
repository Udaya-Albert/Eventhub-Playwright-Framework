import { createApiContext } from "../../utils/apiContext";
import { APIRequestContext } from "@playwright/test";

export class BookingClient {

    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async createBooking(payload : any) {
        return await this.apiContext.post('/api/bookings', {
            data: payload
        });
    }

    async getBookingById(bookingId: string) {
        return await this.apiContext.get(`/api/bookings/${bookingId}`);
    }

    async getBookingbyReference(reference: string) {
        return await this.apiContext.get(`/api/bookings/reference/${reference}`);
    }

    async cancelBooking(bookingId: string) {
        return await this.apiContext.delete(`/api/bookings/${bookingId}`);
    }
}