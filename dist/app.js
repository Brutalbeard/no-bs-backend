"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var koa_1 = __importDefault(require("koa"));
var koa_logger_1 = __importDefault(require("koa-logger"));
var bodyparser_1 = __importDefault(require("@koa/bodyparser"));
var node_process_1 = __importDefault(require("node:process"));
var sequelize_1 = require("./utils/sequelize");
var db_setup_1 = require("./utils/db-setup");
var request_id_1 = __importDefault(require("./utils/request-id"));
require('dotenv').config();
sequelize_1.setupDatabase();
db_setup_1.createDatabaseAssociations();
var index_1 = __importDefault(require("./routes/index"));
var readiness_1 = __importDefault(require("./routes/readiness"));
var liveness_1 = __importDefault(require("./routes/liveness"));
var app = new koa_1["default"]();
app.use(bodyparser_1["default"]());
app.use(koa_logger_1["default"]());
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(ctx.request);
                console.log(ctx.request.body);
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                console.log(ctx.response);
                return [2 /*return*/];
        }
    });
}); });
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (RegExp(/\/api\/v1\/meal/).test(ctx.url)) {
            ctx.state.model = sequelize_1.sequelize.models.Meal;
        }
        else if (RegExp(/\/api\/v1\/daily-plan/).test(ctx.url)) {
            ctx.state.model = sequelize_1.sequelize.models.DailyPlan;
        }
        else if (RegExp(/\/api\/v1\/weekly-plan/).test(ctx.url)) {
            ctx.state.model = sequelize_1.sequelize.models.WeeklyPlan;
        }
        else {
            ctx.state.model = undefined;
        }
        return [2 /*return*/, next()];
    });
}); });
// add a unique request id to each request
app.use(request_id_1["default"]);
app.use(readiness_1["default"].routes());
app.use(readiness_1["default"].allowedMethods());
app.use(liveness_1["default"].routes());
app.use(liveness_1["default"].allowedMethods());
app.use(index_1["default"].routes());
app.use(index_1["default"].allowedMethods());
node_process_1["default"].on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Gracefully shutting down');
                return [4 /*yield*/, sequelize_1.sequelize
                        .close()
                        .then(function () {
                        console.log('Database connection closed');
                        node_process_1["default"].exit(0);
                    })["catch"](function (err) {
                        console.log('Error closing database connection: ', err.message);
                        node_process_1["default"].exit(1);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = app;
