import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const DailyEntry = sequelize.define('DailyEntry', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    breakfastActual: DataTypes.STRING,
    breakfastOnPlan: DataTypes.BOOLEAN,
    breakfastHungriness: DataTypes.STRING,
    breakfastSatisfaction: DataTypes.STRING,

    lunchActual: DataTypes.STRING,
    lunchOnPlan: DataTypes.BOOLEAN,
    lunchHungriness: DataTypes.STRING,
    lunchSatisfaction: DataTypes.STRING,

    dinnerActual: DataTypes.STRING,
    dinnerOnPlan: DataTypes.BOOLEAN,
    dinnerHungriness: DataTypes.STRING,
    dinnerSatisfaction: DataTypes.STRING,

    snacksActual: DataTypes.STRING,
    snacksOnPlan: DataTypes.BOOLEAN,
    snacksHungriness: DataTypes.STRING,
    snacksSatisfaction: DataTypes.STRING,

    otherActual: DataTypes.STRING,
    otherOnPlan: DataTypes.BOOLEAN,
    otherHungriness: DataTypes.STRING,
    otherSatisfaction: DataTypes.STRING,

    sixtyFourOuncesOfWater: DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: DataTypes.BOOLEAN,

    whereDidIDoBetterTodayThanYesterday: DataTypes.STRING,
    whatCanIDoBetterTomorrow: DataTypes.STRING,
    todayIWantToThankMySelfFor: DataTypes.STRING,
    otherThoughtsAboutMyDay: DataTypes.STRING,
});

export default DailyEntry;