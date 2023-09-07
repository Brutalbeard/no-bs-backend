"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class MonthlyPlan extends sequelize_1.Model {
}
MonthlyPlan.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    userId: sequelize_1.DataTypes.INTEGER,
    poundsToLose: sequelize_1.DataTypes.INTEGER,
    monthlyNotes: sequelize_1.DataTypes.STRING,
    iWantToWorkOn: sequelize_1.DataTypes.STRING,
    howIWillWorkOn: sequelize_1.DataTypes.STRING,
    iWouldFeelSuccess: sequelize_1.DataTypes.STRING,
    supportContacts: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'MonthlyPlan',
});
exports.default = MonthlyPlan;
