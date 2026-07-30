import { APIRequestContext } from '@playwright/test';
import { config } from '../config/env.config';

export class AuthHelper {
    public static async login(request: APIRequestContext, username?: string, password?: string): Promise<void> {
        const loginUrl = `${config.authURL}/api/react/authenticate/login`;

        const response = await request.post(loginUrl, {
            data: {
                username: username || config.testUser.username,
                password: password || config.testUser.password
            }
        });

        if (!response.ok()) {
            const responseText = await response.text();
            throw new Error(`Login failed with status ${response.status()}: ${responseText}`);
        }
    }
}
