import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const HabitsDailyEntry = sequelize.define('HabitsDailyEntry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    
    madeAPlan: DataTypes.BOOLEAN,
    followedPlan: DataTypes.BOOLEAN,
    assessedPlan: DataTypes.BOOLEAN,
    ateWhenHungry: DataTypes.BOOLEAN,
    stoppedAtEnough: DataTypes.BOOLEAN,
    sixtyFourOuncesOfWater: DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: DataTypes.BOOLEAN,
});

export default HabitsDailyEntry;