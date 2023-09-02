"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class DailyPlan extends sequelize_1.Model {
}
DailyPlan.init({
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
    gratitude: sequelize_1.DataTypes.STRING,
    todayMyWhyIs: sequelize_1.DataTypes.STRING,
    focus: sequelize_1.DataTypes.STRING,
    obstacle: sequelize_1.DataTypes.STRING,
    overcome: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'DailyPlan',
});
exports.default = DailyPlan;
