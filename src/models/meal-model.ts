import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

import BaseModel from './base-model';
import DailyPlan from './daily-plan-model';
import DailyAssessment from './daily-assessment-model';

class Meal extends BaseModel { }

Meal.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    actual: DataTypes.STRING,
    onPlan: DataTypes.BOOLEAN,
    hungriness: DataTypes.STRING,
    satisfaction: DataTypes.STRING,
    mealType: {
        type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner', 'Other', 'Snack'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Meal',
});

DailyPlan.hasMany(Meal);
Meal.belongsTo(DailyPlan);

export default Meal; 