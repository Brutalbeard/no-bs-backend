import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import sequelize from '../utils/sequelize';
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
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
    date: DataTypes.DATE,
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

MonthlyPlan.hasMany(WeeklyPlan);
MonthlyPlan.hasOne(MonthlyAssessment);
MonthlyAssessment.belongsTo(MonthlyPlan);

export default MonthlyPlan;