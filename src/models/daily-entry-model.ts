import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const DailyEntry = sequelize.define('DailyEntry', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    entry: DataTypes.STRING,
    mood: DataTypes.STRING,
    sleep: DataTypes.STRING,
    exercise: DataTypes.STRING,
    water: DataTypes.STRING,
    food: DataTypes.STRING,
    notes: DataTypes.STRING
});

export default DailyEntry;