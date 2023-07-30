"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize').Sequelize;
var sequelize = new Sequelize("postgres://".concat(process.env.PG_USERNAME, ":").concat(process.env.PG_PASSWORD, "@").concat(process.env.PG_DATABASE_URL, ":").concat(process.env.PG_DATABASE_PORT, "/").concat(process.env.PG_DATABASE_NAME)); // Example for postgres
exports.default = sequelize;
