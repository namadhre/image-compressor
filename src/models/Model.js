import { Sequelize, DataTypes, Op } from 'sequelize';
import { config } from '../config/index.js';

const db = new Sequelize(
    config.database.userName,
    config.database.userName,
    config.database.password,
    {
        host: config.database.host,
        dialect: 'postgres',
        logging: config.database.logging,
        port: config.database.port
    }
);

db.sync({ alter: true }) // Updates table if needed
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Error syncing database", err));

export default db;
export { DataTypes, Op };