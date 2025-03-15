import { Sequelize } from 'sequelize';

// Database connection details

const db = new Sequelize('postgres', 'postgres', '6xEwjlpC@123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    logging: false,  // Set to true if you want to log SQL queries
});

db.sync({ alter: true }) // Updates table if needed
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Error syncing database", err));


export default db;