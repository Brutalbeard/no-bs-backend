"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseAssociations = void 0;
const meal_model_1 = __importDefault(require("../models/meal-model"));
const daily_assessment_model_1 = __importDefault(require("../models/daily-assessment-model"));
const daily_plan_model_1 = __importDefault(require("../models/daily-plan-model"));
const monthly_plan_model_1 = __importDefault(require("../models/monthly-plan-model"));
const monthly_assessment_model_1 = __importDefault(require("../models/monthly-assessment-model"));
const weekly_plan_model_1 = __importDefault(require("../models/weekly-plan-model"));
const weekly_assessment_model_1 = __importDefault(require("../models/weekly-assessment-model"));
async function createDatabaseAssociations() {
    meal_model_1.default.belongsTo(daily_plan_model_1.default);
    daily_plan_model_1.default.hasMany(meal_model_1.default);
    daily_plan_model_1.default.hasOne(daily_assessment_model_1.default);
    daily_assessment_model_1.default.belongsTo(daily_plan_model_1.default);
    weekly_plan_model_1.default.hasMany(daily_plan_model_1.default);
    daily_plan_model_1.default.belongsTo(weekly_plan_model_1.default);
    weekly_plan_model_1.default.hasOne(weekly_assessment_model_1.default);
    weekly_assessment_model_1.default.belongsTo(weekly_plan_model_1.default);
    monthly_plan_model_1.default.hasMany(weekly_plan_model_1.default);
    weekly_plan_model_1.default.belongsTo(monthly_plan_model_1.default);
    monthly_plan_model_1.default.hasOne(monthly_assessment_model_1.default);
    monthly_assessment_model_1.default.belongsTo(monthly_plan_model_1.default);
}
exports.createDatabaseAssociations = createDatabaseAssociations;
