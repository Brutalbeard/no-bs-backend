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
    breakfastPlanned: sequelize_1.DataTypes.STRING,
    breakfastActual: sequelize_1.DataTypes.STRING,
    breakfastOnPlan: sequelize_1.DataTypes.BOOLEAN,
    breakfastHungriness: sequelize_1.DataTypes.STRING,
    breakfastSatisfaction: sequelize_1.DataTypes.STRING,
    lunchPlanned: sequelize_1.DataTypes.STRING,
    lunchActual: sequelize_1.DataTypes.STRING,
    lunchOnPlan: sequelize_1.DataTypes.BOOLEAN,
    lunchHungriness: sequelize_1.DataTypes.STRING,
    lunchSatisfaction: sequelize_1.DataTypes.STRING,
    dinnerPlanned: sequelize_1.DataTypes.STRING,
    dinnerActual: sequelize_1.DataTypes.STRING,
    dinnerOnPlan: sequelize_1.DataTypes.BOOLEAN,
    dinnerHungriness: sequelize_1.DataTypes.STRING,
    dinnerSatisfaction: sequelize_1.DataTypes.STRING,
    snacksPlanned: sequelize_1.DataTypes.STRING,
    snacksActual: sequelize_1.DataTypes.STRING,
    snacksOnPlan: sequelize_1.DataTypes.BOOLEAN,
    snacksHungriness: sequelize_1.DataTypes.STRING,
    snacksSatisfaction: sequelize_1.DataTypes.STRING,
    otherPlanned: sequelize_1.DataTypes.STRING,
    otherActual: sequelize_1.DataTypes.STRING,
    otherOnPlan: sequelize_1.DataTypes.BOOLEAN,
    otherHungriness: sequelize_1.DataTypes.STRING,
    otherSatisfaction: sequelize_1.DataTypes.STRING,
    oneThingIAmGratefulFor: sequelize_1.DataTypes.STRING,
    todayMyWhyIs: sequelize_1.DataTypes.STRING,
    oneThingIWillFocusOnToLoseWeight: sequelize_1.DataTypes.STRING,
    whatIsAnObstacleIWillFaceToday: sequelize_1.DataTypes.STRING,
    howWillIOvercomeThisObstacleWithoutFood: sequelize_1.DataTypes.STRING,
});
exports.default = DailyEntry;
