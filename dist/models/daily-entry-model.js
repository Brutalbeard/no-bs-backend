"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize_2 = __importDefault(require("../utils/sequelize"));
var DailyEntry = sequelize_2.default.define('DailyEntry', {
    id: sequelize_1.DataTypes.INTEGER,
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    date: sequelize_1.DataTypes.DATE,
    entry: sequelize_1.DataTypes.STRING,
    mood: sequelize_1.DataTypes.STRING,
    sleep: sequelize_1.DataTypes.STRING,
    exercise: sequelize_1.DataTypes.STRING,
    water: sequelize_1.DataTypes.STRING,
    food: sequelize_1.DataTypes.STRING,
    notes: sequelize_1.DataTypes.STRING
});
exports.default = DailyEntry;
