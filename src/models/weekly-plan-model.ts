import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const WeeklyPlan = sequelize.define('WeeklyPlan', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,


    howManyPoundsToLoseThisWeek: DataTypes.INTEGER,
    
    whatCanIDoDifferentlyThisWeek: DataTypes.STRING,
    whatAreMyGoalsOutsideOfTheScaleThisWeek: DataTypes.STRING,
    weightLossObstaclesThisWeek: DataTypes.STRING,
});

export default WeeklyPlan;