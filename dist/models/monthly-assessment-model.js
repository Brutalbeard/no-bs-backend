"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../utils/sequelize");
class MonthlyAssessment extends sequelize_1.Model {
}
MonthlyAssessment.init({
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
    poundsLost: sequelize_1.DataTypes.INTEGER,
    hoursOfExcercise: sequelize_1.DataTypes.INTEGER,
    daysOnPlan: sequelize_1.DataTypes.INTEGER,
    sleepOnPlan: sequelize_1.DataTypes.INTEGER,
    plansMade: sequelize_1.DataTypes.INTEGER,
    planedAssessments: sequelize_1.DataTypes.INTEGER,
    startedFromHungry: sequelize_1.DataTypes.INTEGER,
    stoppedAtEnough: sequelize_1.DataTypes.INTEGER,
    drank64OuncesOfWater: sequelize_1.DataTypes.INTEGER,
    startingWeight: sequelize_1.DataTypes.INTEGER,
    endingWeight: sequelize_1.DataTypes.INTEGER,
    neckMeasurement: sequelize_1.DataTypes.INTEGER,
    hipMeasurement: sequelize_1.DataTypes.INTEGER,
    stomachMeasurement: sequelize_1.DataTypes.INTEGER,
    ribCageMeasurement: sequelize_1.DataTypes.INTEGER,
    rightThighMeasurement: sequelize_1.DataTypes.INTEGER,
    letfThighMeasurement: sequelize_1.DataTypes.INTEGER,
    rightArmMeasurement: sequelize_1.DataTypes.INTEGER,
    leftArmMeasurement: sequelize_1.DataTypes.INTEGER,
    monthlyNotes: sequelize_1.DataTypes.STRING,
    sleepQuality: sequelize_1.DataTypes.INTEGER,
    selfRating: sequelize_1.DataTypes.INTEGER,
    stressLevel: sequelize_1.DataTypes.INTEGER,
    easeAroundFood: sequelize_1.DataTypes.INTEGER,
    enegryAndMood: sequelize_1.DataTypes.INTEGER,
    positiveBodyTalk: sequelize_1.DataTypes.INTEGER,
    selfCompassion: sequelize_1.DataTypes.INTEGER,
    didIWorkOnWhatISaidIWould: sequelize_1.DataTypes.BOOLEAN,
    didIWorkOnWhatISaidIWouldNotes: sequelize_1.DataTypes.STRING,
    changesNoticed: sequelize_1.DataTypes.STRING,
    workOnNextMonth: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'MonthlyAssessment',
});
exports.default = MonthlyAssessment;