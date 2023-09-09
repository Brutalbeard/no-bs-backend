"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class DailyHabit extends sequelize_1.Model {
}
DailyHabit.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    madeAPlan: sequelize_1.DataTypes.BOOLEAN,
    followedPlan: sequelize_1.DataTypes.BOOLEAN,
    assessedPlan: sequelize_1.DataTypes.BOOLEAN,
    ateWhenHungry: sequelize_1.DataTypes.BOOLEAN,
    stoppedAtEnough: sequelize_1.DataTypes.BOOLEAN,
    sixtyFourOuncesOfWater: sequelize_1.DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: sequelize_1.DataTypes.BOOLEAN,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'dailyHabit',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: ['deletedAt'],
        }
    },
    timestamps: true,
});
exports.default = DailyHabit;
