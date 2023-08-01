import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import DailyPlan from './daily-plan-model';
import DailyAssessment from './daily-assessment-model';

class Snack extends BaseModel {}

Snack.init({
    actual: DataTypes.STRING,
    onPlan: DataTypes.BOOLEAN,
    hungriness: DataTypes.STRING,
    satisfaction: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Snack',
});

Snack.belongsTo(DailyPlan);
Snack.belongsTo(DailyAssessment);

export default Snack; 