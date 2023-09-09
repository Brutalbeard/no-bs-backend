"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class WeeklyPlan extends sequelize_1.Model {
}
WeeklyPlan.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    poundsToLose: sequelize_1.DataTypes.INTEGER,
    differentThisWeek: sequelize_1.DataTypes.STRING,
    goalsOutsideScale: sequelize_1.DataTypes.STRING,
    obstacles: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'weeklyPlan',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: ['deletedAt'],
        }
    },
    timestamps: true,
});
exports.default = WeeklyPlan;
