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
var DailyAssessment = /** @class */ (function (_super) {
    __extends(DailyAssessment, _super);
    function DailyAssessment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DailyAssessment;
}(sequelize_1.Model));
DailyAssessment.init({
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
    sixtyFourOuncesOfWater: sequelize_1.DataTypes.BOOLEAN,
    sevenPlusHoursOfSleep: sequelize_1.DataTypes.BOOLEAN,
    betterThanYesterday: sequelize_1.DataTypes.STRING,
    betterTomorrow: sequelize_1.DataTypes.STRING,
    thankMyself: sequelize_1.DataTypes.STRING,
    otherThoughts: sequelize_1.DataTypes.STRING
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'DailyAssessment'
});
exports["default"] = DailyAssessment;
