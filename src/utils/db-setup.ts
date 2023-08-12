
import Meal from "../models/meal-model";
import DailyAssessment from "../models/daily-assessment-model";
import DailyPlan from "../models/daily-plan-model";
import MonthlyPlan from "../models/monthly-plan-model";
import MonthlyAssessment from "../models/monthly-assessment-model";
import WeeklyPlan from "../models/weekly-plan-model";
import WeklyAssessment from "../models/weekly-assessment-model";

async function createDatabaseAssociations() {
    Meal.belongsTo(DailyPlan);
    DailyPlan.hasMany(Meal);
    DailyPlan.hasOne(DailyAssessment);
    DailyAssessment.belongsTo(DailyPlan);
    WeeklyPlan.hasMany(DailyPlan);
    DailyPlan.belongsTo(WeeklyPlan);
    WeeklyPlan.hasOne(WeklyAssessment);
    WeklyAssessment.belongsTo(WeeklyPlan);
    MonthlyPlan.hasMany(WeeklyPlan);
    WeeklyPlan.belongsTo(MonthlyPlan);
    MonthlyPlan.hasOne(MonthlyAssessment);
    MonthlyAssessment.belongsTo(MonthlyPlan);
}

export { createDatabaseAssociations }