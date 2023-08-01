import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_DATABASE_URL}:${process.env.PG_DATABASE_PORT}/${process.env.PG_DATABASE_NAME}`) // Example for postgres
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
}) // Example for sqlite

export default sequelize;