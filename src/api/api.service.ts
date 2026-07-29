import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiService {
    public constructor(private request: APIRequestContext) {}

    public async get(url: string): Promise<APIResponse> {
        return await this.request.get(url);
    }

    public async post(url: string, data?: unknown): Promise<APIResponse> {
        return await this.request.post(url, {
            data
        });
    }

    public async delete(url: string, data?: unknown): Promise<APIResponse> {
        return await this.request.post(url, {
            data
        });
    }
}
