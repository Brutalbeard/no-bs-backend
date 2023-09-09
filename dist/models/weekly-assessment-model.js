"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class WeeklyAssessment extends sequelize_1.Model {
}
WeeklyAssessment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    thisWeekIWeighed: sequelize_1.DataTypes.INTEGER,
    planningSelfRatingThisWeek: sequelize_1.DataTypes.INTEGER,
    planningSelfRatingReason: sequelize_1.DataTypes.STRING,
    waitingForHungerSelfRatingThisWeek: sequelize_1.DataTypes.INTEGER,
    waitingForHungerSelfRatingReason: sequelize_1.DataTypes.STRING,
    stoppingWhenSatisfiedSelfRatingThisWeek: sequelize_1.DataTypes.INTEGER,
    stoppingWhenSatisfiedSelfRatingReason: sequelize_1.DataTypes.STRING,
    weeklyNotes: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'weeklyAssessment',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: ['deletedAt'],
        }
    },
    timestamps: true,
});
exports.default = WeeklyAssessment;
