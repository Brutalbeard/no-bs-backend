import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const WeeklyAssessment = sequelize.define('WeeklyAssessment', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    thisWeekIWeighed: DataTypes.INTEGER,
    planningSelfRatingThisWeek: DataTypes.INTEGER,
    planningSelfRatingReason: DataTypes.STRING,
    waitingForHungerSelfRatingThisWeek: DataTypes.INTEGER,
    waitingForHungerSelfRatingReason: DataTypes.STRING,
    stoppingWhenSatisfiedSelfRatingThisWeek: DataTypes.INTEGER,
    stoppingWhenSatisfiedSelfRatingReason: DataTypes.STRING,

    weeklyNotes: DataTypes.STRING,
});

export default WeeklyAssessment;