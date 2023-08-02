import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';

class DailyAssessment extends BaseModel { }

DailyAssessment.init({
    date: DataTypes.DATE,

    sixtyFourOuncesOfWater: DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: DataTypes.BOOLEAN,

    whereDidIDoBetterTodayThanYesterday: DataTypes.STRING,
    whatCanIDoBetterTomorrow: DataTypes.STRING,
    todayIWantToThankMySelfFor: DataTypes.STRING,
    otherThoughtsAboutMyDay: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'DailyAssessment',
});

export default DailyAssessment;