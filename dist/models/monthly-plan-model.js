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
var MonthlyPlan = /** @class */ (function (_super) {
    __extends(MonthlyPlan, _super);
    function MonthlyPlan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MonthlyPlan;
}(sequelize_1.Model));
MonthlyPlan.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    userId: sequelize_1.DataTypes.INTEGER,
    poundsToLose: sequelize_1.DataTypes.INTEGER,
    monthlyNotes: sequelize_1.DataTypes.STRING,
    iWantToWorkOn: sequelize_1.DataTypes.STRING,
    howIWillWorkOn: sequelize_1.DataTypes.STRING,
    iWouldFeelSuccess: sequelize_1.DataTypes.STRING,
    supportContacts: sequelize_1.DataTypes.STRING
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'MonthlyPlan'
});
exports["default"] = MonthlyPlan;
