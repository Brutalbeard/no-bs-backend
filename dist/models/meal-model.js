"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class Meal extends sequelize_1.Model {
}
Meal.init({
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
        validate: {
            isDate: true,
        },
    },
    actual: sequelize_1.DataTypes.STRING,
    onPlan: sequelize_1.DataTypes.BOOLEAN,
    hungriness: sequelize_1.DataTypes.STRING,
    satisfaction: sequelize_1.DataTypes.STRING,
    mealType: {
        type: sequelize_1.DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner', 'Other', 'Snack'),
        allowNull: false,
        validate: {
            isIn: [['Breakfast', 'Lunch', 'Dinner', 'Other', 'Snack']],
        },
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'Meal',
});
exports.default = Meal;
