import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import Breakfast from './breakfast-model';
import Lunch from './lunch-model';
import Dinner from './dinner-model';
import Snack from './snack-model';
import Other from './other-model';

class DailyPlan extends BaseModel {}

DailyPlan.init({
    date: DataTypes.DATE,
    oneThingIAmGratefulFor: DataTypes.STRING,
    todayMyWhyIs: DataTypes.STRING,
    oneThingIWillFocusOnToLoseWeight: DataTypes.STRING,
    whatIsAnObstacleIWillFaceToday: DataTypes.STRING,
    howWillIOvercomeThisObstacleWithoutFood: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'DailyPlan',
});

DailyPlan.hasOne(Breakfast);
DailyPlan.hasOne(Lunch);
DailyPlan.hasOne(Dinner);
DailyPlan.hasMany(Snack);
DailyPlan.hasMany(Other);

export default DailyPlan;