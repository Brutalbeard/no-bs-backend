import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import DailyPlan from './daily-plan-model';
import DailyAssessment from './daily-assessment-model';

class Breakfast extends BaseModel { }

Breakfast.init({
    date: DataTypes.DATE,
    actual: DataTypes.STRING,
    onPlan: DataTypes.BOOLEAN,
    hungriness: DataTypes.STRING,
    satisfaction: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Breakfast',
});

// Breakfast.belongsTo(DailyPlan);
// Breakfast.belongsTo(DailyAssessment);

export default Breakfast; 