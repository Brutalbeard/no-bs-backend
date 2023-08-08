import { Sequelize } from "sequelize";

require('dotenv').config();

// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: process.env.PG_DATABASE_ADDRESS,
//     port: parseInt(process.env.PG_DATABASE_PORT),
//     username: process.env.PG_USERNAME,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE_NAME
// }) 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
}) 

// const sequelize = new Sequelize('sqlite::memory:');

export default sequelize;