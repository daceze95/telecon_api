export { dbConnection } from './dbConfig';
export const APP_SECRET = process.env.APP_SECRET as string;
export const SALT_ROUND = 10
export const BASE_URL = "/api/v1"
export const CLIENT_URI = process.env.CLIENT_URI as string;
