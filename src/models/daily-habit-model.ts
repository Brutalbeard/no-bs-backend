import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';

class DailyHabit extends BaseModel { }

DailyHabit.init('DailyHabit', {
    date: DataTypes.DATE,
    madeAPlan: DataTypes.BOOLEAN,
    followedPlan: DataTypes.BOOLEAN,
    assessedPlan: DataTypes.BOOLEAN,
    ateWhenHungry: DataTypes.BOOLEAN,
    stoppedAtEnough: DataTypes.BOOLEAN,
    sixtyFourOuncesOfWater: DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: DataTypes.BOOLEAN,
},{
    sequelize,
    modelName: 'DailyHabit',
});

export default DailyHabit;