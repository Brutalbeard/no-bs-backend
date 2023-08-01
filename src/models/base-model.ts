import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const BaseModel = sequelize.define('BaseModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
});

export default BaseModel;