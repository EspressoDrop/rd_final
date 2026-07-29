import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    baseURL: process.env.BASE_URL || 'https://new.fophelp.pro',
    apiBaseURL: process.env.API_BASE_URL || 'https://new.fophelp.pro/api',
    authURL: process.env.AUTH_URL || 'https://new.fophelp.pro',
    testUser: {
        username: process.env.TEST_USERNAME || '',
        password: process.env.TEST_PASSWORD || ''
    }
};
