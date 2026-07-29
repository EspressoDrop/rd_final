import { APIRequestContext, expect } from '@playwright/test';
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

    public static async deleteAllIncomes(request: APIRequestContext): Promise<void> {
        const response = await request.get(`${config.apiBaseURL}/incomes`);

        if (!response.ok()) {
            console.log(`Failed to get incomes: ${response.status()}`);
            return;
        }

        const text = await response.text();
        if (!text) {
            return;
        }

        const body = JSON.parse(text);
        if (body.length > 0) {
            for (const income of body) {
                const deleteResponse = await request.post(`${config.apiBaseURL}/incomes/delete`, {
                    data: { id: income.id }
                });
                expect(deleteResponse.status()).toBeLessThan(202);
            }
        }
    }

    public static async deleteAllExpenses(request: APIRequestContext): Promise<void> {
        const response = await request.get(`${config.apiBaseURL}/expenses`);

        if (!response.ok()) {
            console.log(`Failed to get expenses: ${response.status()}`);
            return;
        }

        const text = await response.text();
        if (!text) {
            return;
        }

        const body = JSON.parse(text);
        if (body.length > 0) {
            for (const expense of body) {
                const deleteResponse = await request.post(`${config.apiBaseURL}/expenses/delete`, {
                    data: { id: expense.id }
                });
                expect(deleteResponse.status()).toBeLessThan(202);
            }
        }
    }
}
