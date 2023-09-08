"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: process.env.PG_DATABASE_ADDRESS,
    port: parseInt(process.env.PG_DATABASE_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE_NAME,
    logging: false
});
exports.sequelize = sequelize;
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false
// })
// const sequelize = new Sequelize('sqlite::memory:');
async function setupDatabase() {
    await sequelize
        .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    await sequelize
        .sync()
        .catch((err) => console.error(err));
}
exports.setupDatabase = setupDatabase;
