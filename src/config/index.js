import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    userName: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: JSON.parse(process.env.DB_LOGGING || 'false'), 
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    userName: process.env.REDIS_USER_NAME,
  },
};
