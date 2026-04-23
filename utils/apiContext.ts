import { request, Request } from "@playwright/test";


export const createApiContext = async (token?: string) => {
    const baseURL = process.env.BASE_URL;
     console.log('BASE_URL:', process.env.BASE_URL);
     if (!baseURL) {
        throw new Error("BASE_URL is undefined. Did you forget to load .env?");
    }
     
     console.log("TOKEN:", token);
    return await request.newContext({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: token
        ? {
            Authorization: `Bearer ${token}`
        }
        :{}

        
    });
   

}
