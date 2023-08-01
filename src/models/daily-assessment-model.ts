import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import Breakfast from './breakfast-model';
import Lunch from './lunch-model';
import Dinner from './dinner-model';
import Snack from './snack-model';
import Other from './other-model';

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

DailyAssessment.hasOne(Breakfast);
DailyAssessment.hasOne(Lunch);
DailyAssessment.hasOne(Dinner);
DailyAssessment.hasMany(Snack);
DailyAssessment.hasMany(Other);

export default DailyAssessment;