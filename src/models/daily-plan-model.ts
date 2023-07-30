import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const DailyEntry = sequelize.define('DailyEntry', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    breakfastPlan: DataTypes.STRING,
    breakfastType: DataTypes.STRING,

    lunchPlan: DataTypes.STRING,
    lunchType: DataTypes.STRING,

    dinnerPlan: DataTypes.STRING,
    dinnerType: DataTypes.STRING,

    snacksPlan: DataTypes.STRING,
    snacksType: DataTypes.STRING,

    otherPlan: DataTypes.STRING,
    otherType: DataTypes.STRING,

    oneThingIAmGratefulFor: DataTypes.STRING,
    todayMyWhyIs: DataTypes.STRING,
    oneThingIWillFocusOnToLoseWeight: DataTypes.STRING,
    whatIsAnObstacleIWillFaceToday: DataTypes.STRING,
    howWillIOvercomeThisObstacleWithoutFood: DataTypes.STRING,
});

export default DailyEntry;