import {request} from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';

export class AuthClient {

    async register(payload : { email: string; password: string }) {

        const apiContext =await createApiContext();
        return await apiContext.post('/api/auth/register', {
            data: payload
        });

    }

    async login(payload : { email: string; password: string }) {

        const apiContext =await createApiContext();
        return await apiContext.post('/api/auth/login', {
            data: payload
        });
}
}