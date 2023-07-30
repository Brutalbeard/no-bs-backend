import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const MonthlyEntry = sequelize.define('MonthlyEntry', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    howManyPoundsToLoseThisMonth: DataTypes.INTEGER,

    monthlyNotes: DataTypes.STRING,

    thisMonthIWantToWorkOn: DataTypes.STRING,
    thisMonthPlanToAccomplishWhatIWantToWorkOn: DataTypes.STRING,
    iWouldFeelSuccessfulByEndOfMonthIf: DataTypes.STRING,
    whoCanIReachOutToForSupport: DataTypes.STRING,
});

export default MonthlyEntry;