import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import WeeklyAssessment from './weekly-assessment-model';
import sequelize from '../utils/sequelize';

class WeeklyPlan extends Model<InferAttributes<WeeklyPlan>, InferCreationAttributes<WeeklyPlan>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;

    declare poundsToLose: number;
    declare differentThisWeek: string;
    declare goalsOutsideScale: string;
    declare obstacles: string;
}

WeeklyPlan.init({
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
    poundsToLose: DataTypes.INTEGER,
    differentThisWeek: DataTypes.STRING,
    goalsOutsideScale: DataTypes.STRING,
    obstacles: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'WeeklyPlan',
});

WeeklyPlan.hasOne(WeeklyAssessment);
WeeklyAssessment.belongsTo(WeeklyPlan);

export default WeeklyPlan;