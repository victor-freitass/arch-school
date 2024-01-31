import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Pool({
    host: 'db',
    user: 'postgres',
    database: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});

export default client;