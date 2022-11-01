import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const DBConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    cluster: process.env.DB_CLUSTER,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS === 'true'
};

export const ServerConfig = {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    env: process.env.NODE_ENV,
    log_dir: process.env.LOG_DIR,
    log_format: process.env.LOG_FORMAT
};

