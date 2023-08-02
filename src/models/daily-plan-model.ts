import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

import BaseModel from './base-model';
import DailyAssessment from './daily-assessment-model';
import Meal from './meal-model';

class DailyPlan extends BaseModel { }

DailyPlan.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    oneThingIAmGratefulFor: DataTypes.STRING,
    todayMyWhyIs: DataTypes.STRING,
    oneThingIWillFocusOnToLoseWeight: DataTypes.STRING,
    whatIsAnObstacleIWillFaceToday: DataTypes.STRING,
    howWillIOvercomeThisObstacleWithoutFood: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'DailyPlan',
});

DailyPlan.hasOne(DailyAssessment);
DailyAssessment.belongsTo(DailyPlan);

export default DailyPlan;