import { Sequelize } from 'sequelize';
import config from '../config.js';

console.log('config', config);

console.log('process.env', process.env);

const db = new Sequelize(config.db.database, config.db.userName, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,
    logging: config.db.logging,
});

db.sync({ alter: true }) // Updates table if needed
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Error syncing database", err));


export default db;