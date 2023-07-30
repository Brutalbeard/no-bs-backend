import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

const MonthlyAssessment = sequelize.define('MonthlyAssessment', {
    id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,

    howManyPoundsDidILoseThisMonthActual: DataTypes.INTEGER,
    howManyHoursOfExerciseDidIDoThisMonthActual: DataTypes.INTEGER,
    howManyDaysDidIStayOnPlanThisMonthActual: DataTypes.INTEGER,
    howManyDaysDidISleepOnPlanThisMonthActual: DataTypes.INTEGER,
    howManyDaysDidIMakeOnPlanThisMonthPlanned: DataTypes.INTEGER,
    howManyDaysDidIAssessThePlanThisMonthPlanned: DataTypes.INTEGER,
    howManyMealsDidIEatStartEatingFromHungry: DataTypes.INTEGER,
    howManyMealsDidIStopAtEnough: DataTypes.INTEGER,
    howManyDaysDidIDrink64OuncesOfWater: DataTypes.INTEGER,

    startingWeight: DataTypes.INTEGER,
    endingWeight: DataTypes.INTEGER,

    neckMeasurement: DataTypes.INTEGER,
    hipMeasurement: DataTypes.INTEGER,
    stomachMeasurement: DataTypes.INTEGER,
    ribCageMeasurement: DataTypes.INTEGER,
    rightThighMeasurement: DataTypes.INTEGER,
    letfThighMeasurement: DataTypes.INTEGER,
    rightArmMeasurement: DataTypes.INTEGER,
    leftArmMeasurement: DataTypes.INTEGER,

    monthlyNotes: DataTypes.STRING,

    sleepQuality: DataTypes.INTEGER,
    selfRating: DataTypes.INTEGER,
    stressLevel: DataTypes.INTEGER,
    easeAroundFood: DataTypes.INTEGER,
    enegryAndMood: DataTypes.INTEGER,
    positiveBodyTalk: DataTypes.INTEGER,
    selfCompassion: DataTypes.INTEGER,

    didIWorkOnWhatISaidIWould: DataTypes.BOOLEAN,
    didIWorkOnWhatISaidIWouldNotes: DataTypes.STRING,
    whatChangesDidINoticeThisMonthBeyondWeight: DataTypes.STRING,
    whatIsOneThingToWorkOnNextMonth: DataTypes.STRING,
});

export default MonthlyAssessment;