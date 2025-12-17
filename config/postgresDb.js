// filepath: c:\test\test\config\postgresDb.js
// ...existing code...
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const user = process.env.DB_USER || 'postgres';
const pass = process.env.DB_PASS || '123';
// default to the standard maintenance DB so connection errors are clearer
const db = process.env.DB_NAME || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

if (!user) throw new Error('Missing DB_USER environment variable');
if (pass === undefined) throw new Error('Missing DB_PASS environment variable');

export const sequelize = new Sequelize(db, user, pass, {
    host,
    port,
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: false },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Postgres connected (DB:', db + ')');
        return sequelize;
    } catch (err) {
        console.error('Postgres connection error:', err.message || err);
        throw err;
    }
};
// ...existing code...