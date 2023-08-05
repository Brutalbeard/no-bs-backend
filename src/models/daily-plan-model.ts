import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import sequelize from '../utils/sequelize';

import DailyAssessment from './daily-assessment-model';
import Meal from './meal-model';

class DailyPlan extends Model<InferAttributes<DailyPlan>, InferCreationAttributes<DailyPlan>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;
    declare gratitude: string | null;
    declare todayMyWhyIs: string | null;
    declare focus: string | null;
    declare obstacle: string | null;
    declare overcome: string | null;

    declare getDailyAssessment: HasManyGetAssociationsMixin<DailyAssessment>;
    declare setDailyAssessment: HasManySetAssociationsMixin<DailyAssessment, number>;
    declare addDailyAssessment: HasManyAddAssociationMixin<DailyAssessment, number>;

    declare getMeals: HasManyGetAssociationsMixin<Meal>;
    declare setMeal: HasManySetAssociationsMixin<Meal, number>;
    declare addMeal: HasManyAddAssociationMixin<Meal, number>;
 }

DailyPlan.init({
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
    gratitude: DataTypes.STRING,
    todayMyWhyIs: DataTypes.STRING,
    focus: DataTypes.STRING,
    obstacle: DataTypes.STRING,
    overcome: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'DailyPlan',
});

DailyPlan.hasOne(DailyAssessment);
DailyAssessment.belongsTo(DailyPlan);

export default DailyPlan;