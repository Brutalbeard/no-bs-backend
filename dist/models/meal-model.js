"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("../utils/sequelize");
var Meal = /** @class */ (function (_super) {
    __extends(Meal, _super);
    function Meal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Meal;
}(sequelize_1.Model));
Meal.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    actual: sequelize_1.DataTypes.STRING,
    onPlan: sequelize_1.DataTypes.BOOLEAN,
    hungriness: sequelize_1.DataTypes.STRING,
    satisfaction: sequelize_1.DataTypes.STRING,
    mealType: {
        type: sequelize_1.DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner', 'Other', 'Snack'),
        allowNull: false,
        validate: {
            isIn: [['Breakfast', 'Lunch', 'Dinner', 'Other', 'Snack']]
        }
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'Meal'
});
exports["default"] = Meal;
