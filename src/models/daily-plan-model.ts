import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const DailyEntry = sequelize.define('DailyEntry', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    breakfastPlanned: DataTypes.STRING,

    lunchPlanned: DataTypes.STRING,

    dinnerPlanned: DataTypes.STRING,

    snacksPlanned: DataTypes.STRING,

    otherPlanned: DataTypes.STRING,

    oneThingIAmGratefulFor: DataTypes.STRING,
    todayMyWhyIs: DataTypes.STRING,
    oneThingIWillFocusOnToLoseWeight: DataTypes.STRING,
    whatIsAnObstacleIWillFaceToday: DataTypes.STRING,
    howWillIOvercomeThisObstacleWithoutFood: DataTypes.STRING,
});

export default DailyEntry;