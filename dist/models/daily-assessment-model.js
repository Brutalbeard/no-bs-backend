"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class DailyAssessment extends sequelize_1.Model {
}
DailyAssessment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    sixtyFourOuncesOfWater: sequelize_1.DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: sequelize_1.DataTypes.BOOLEAN,
    betterThanYesterday: sequelize_1.DataTypes.STRING,
    betterTomorrow: sequelize_1.DataTypes.STRING,
    thankMyself: sequelize_1.DataTypes.STRING,
    otherThoughts: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'dailyAssessment',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: ['deletedAt'],
        }
    },
    timestamps: true,
});
exports.default = DailyAssessment;
