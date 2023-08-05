import { Sequelize } from "sequelize";

require('dotenv').config();

//`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_DATABASE_ADDRESS}:${process.env.PG_DATABASE_PORT}/${process.env.PG_DATABASE_NAME}`

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.PG_DATABASE_ADDRESS,
    port: parseInt(process.env.PG_DATABASE_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE_NAME
}) // Example for postgres
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite'
// }) // Example for sqlite

export default sequelize;