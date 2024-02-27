import { Sequelize } from "sequelize";
import emitter from "./events";

require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
})

// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     storage: './database.sqlite',
//     host: process.env.PG_DATABASE_ADDRESS,
//     port: parseInt(process.env.PG_DATABASE_PORT),
//     username: process.env.PG_USERNAME,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE_NAME,
//     logging: false
// })

async function setupDatabase() {

    await sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            emitter.emit('db-connected', true);
        }).catch((err: Error) => {
            console.error('Unable to connect to the database:', err);
            emitter.emit('db-connected', false);
        });

    await sequelize
        .sync()
        .then(() => {
            console.log('Database synchronized');
            emitter.emit('db-synced', true);
        })
        .catch((err: Error) => {
            console.error('Database sync failed', err);
            emitter.emit('db-synced', false);
        });
}

export { sequelize, setupDatabase };
