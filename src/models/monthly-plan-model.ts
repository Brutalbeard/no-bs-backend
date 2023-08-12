import {
    DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';
import {sequelize} from '../utils/sequelize';
import WeeklyPlan from './weekly-plan-model';
import MonthlyAssessment from './monthly-assessment-model';

class MonthlyPlan extends Model<InferAttributes<MonthlyPlan>, InferCreationAttributes<MonthlyPlan>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;
    declare userId: number;

    declare poundsToLose: number;

    declare monthlyNotes: string;

    declare iWantToWorkOn: string;
    declare howIWillWorkOn: string;
    declare iWouldFeelSuccess: string;
    declare supportContacts: string;
}

MonthlyPlan.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: DataTypes.INTEGER,

    poundsToLose: DataTypes.INTEGER,

    monthlyNotes: DataTypes.STRING,

    iWantToWorkOn: DataTypes.STRING,
    howIWillWorkOn: DataTypes.STRING,
    iWouldFeelSuccess: DataTypes.STRING,
    supportContacts: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'MonthlyPlan',
});

export default MonthlyPlan;