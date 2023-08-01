import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import DailyPlan from './daily-plan-model';
import DailyAssessment from './daily-assessment-model';

class Dinner extends BaseModel { }

Dinner.init({
    date: DataTypes.DATE,
    actual: DataTypes.STRING,
    onPlan: DataTypes.BOOLEAN,
    hungriness: DataTypes.STRING,
    satisfaction: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Dinner',
});

// Dinner.belongsTo(DailyPlan);
// Dinner.belongsTo(DailyAssessment);

export default Dinner; 