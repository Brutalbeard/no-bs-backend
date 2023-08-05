import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import sequelize from '../utils/sequelize';

class DailyAssessment extends Model<InferAttributes<DailyAssessment>, InferCreationAttributes<DailyAssessment>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;
    declare sixtyFourOuncesOfWater: boolean | null;
    declare sevenPlusHoursOfSleep: boolean | null;
    declare betterThanYesterday: string | null;
    declare betterTomorrow: string | null;
    declare thankMyself: string | null;
    declare otherThoughts: string | null;
 }

DailyAssessment.init({
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
    sixtyFourOuncesOfWater: DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: DataTypes.BOOLEAN,
    betterThanYesterday: DataTypes.STRING,
    betterTomorrow: DataTypes.STRING,
    thankMyself: DataTypes.STRING,
    otherThoughts: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'DailyAssessment',
});

export default DailyAssessment;