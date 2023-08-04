import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import sequelize from '../utils/sequelize';

class WeeklyAssessment extends Model<InferAttributes<WeeklyAssessment>, InferCreationAttributes<WeeklyAssessment>> {
    declare id: CreationOptional<number>;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare date: Date;
    declare userId: number;

    declare thisWeekIWeighed: number;
    declare planningSelfRatingThisWeek: number;
    declare planningSelfRatingReason: string;
    declare waitingForHungerSelfRatingThisWeek: number;
    declare waitingForHungerSelfRatingReason: string;
    declare stoppingWhenSatisfiedSelfRatingThisWeek: number;
    declare stoppingWhenSatisfiedSelfRatingReason: string;

    declare weeklyNotes: string;
}

WeeklyAssessment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    thisWeekIWeighed: DataTypes.INTEGER,
    planningSelfRatingThisWeek: DataTypes.INTEGER,
    planningSelfRatingReason: DataTypes.STRING,
    waitingForHungerSelfRatingThisWeek: DataTypes.INTEGER,
    waitingForHungerSelfRatingReason: DataTypes.STRING,
    stoppingWhenSatisfiedSelfRatingThisWeek: DataTypes.INTEGER,
    stoppingWhenSatisfiedSelfRatingReason: DataTypes.STRING,

    weeklyNotes: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'WeeklyAssessment',
});

export default WeeklyAssessment;