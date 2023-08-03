import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import sequelize from '../utils/sequelize';

class DailyHabit extends Model<InferAttributes<DailyHabit>, InferCreationAttributes<DailyHabit>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;
    declare madeAPlan: boolean | null;
    declare followedPlan: boolean | null;
    declare assessedPlan: boolean | null;
    declare ateWhenHungry: boolean | null;
    declare stoppedAtEnough: boolean | null;
    declare sixtyFourOuncesOfWater: boolean | null;
    declare sevenPlusHoursOfSleep: boolean | null;
}

DailyHabit.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    madeAPlan: DataTypes.BOOLEAN,
    followedPlan: DataTypes.BOOLEAN,
    assessedPlan: DataTypes.BOOLEAN,
    ateWhenHungry: DataTypes.BOOLEAN,
    stoppedAtEnough: DataTypes.BOOLEAN,
    sixtyFourOuncesOfWater: DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: 'DailyHabit',
});

export default DailyHabit;