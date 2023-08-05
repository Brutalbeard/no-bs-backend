import { 
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
   } from 'sequelize';
import sequelize from '../utils/sequelize';

import DailyPlan from './daily-plan-model';

class Meal extends Model<InferAttributes<Meal>, InferCreationAttributes<Meal>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;
    declare actual: string | null;
    declare onPlan: boolean | null;
    declare hungriness: string | null;
    declare satisfaction: string | null;
    declare mealType: "Breakfast" | "Lunch" | "Dinner" | "Other" | "Snack";

    declare getDailyPlan: HasManyGetAssociationsMixin<DailyPlan>;
    declare setDailyPlan: HasManySetAssociationsMixin<DailyPlan, number>;
    declare addDailyPlan: HasManyAddAssociationMixin<DailyPlan, number>;
}

Meal.init({
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