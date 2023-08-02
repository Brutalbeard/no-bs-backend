import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';

class BaseModel extends Model { }

BaseModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
}, {
    sequelize,
    modelName: 'BaseModel',
    paranoid: true,
});

export default BaseModel;