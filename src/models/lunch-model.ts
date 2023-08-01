import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import DailyPlan from './daily-plan-model';
import DailyAssessment from './daily-assessment-model';

class Lunch extends BaseModel {}

Lunch.init({
    actual: DataTypes.STRING,
    onPlan: DataTypes.BOOLEAN,
    hungriness: DataTypes.STRING,
    satisfaction: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Lunch',
});

Lunch.belongsTo(DailyPlan);
Lunch.belongsTo(DailyAssessment);

export default Lunch; 