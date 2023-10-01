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
exports.__esModule = true;
var router_1 = __importDefault(require("@koa/router"));
var sequelize_1 = require("../utils/sequelize");
var modelRoutePaths = Object.keys(sequelize_1.sequelize.models).map(function (modelName) {
    return modelName = "/" + modelName.toLowerCase();
});
var modelRoutePathsWithId = Object.keys(sequelize_1.sequelize.models).map(function (modelName) {
    return modelName = "/" + modelName.toLowerCase() + "/:id";
});
// let modelRoutePaths = '[meal|daily-plan|weekly-plan]'
var router = new router_1["default"]({
    prefix: '/api/v1'
});
router
    .get(modelRoutePaths, listItems)
    .get(modelRoutePathsWithId, getById)
    .post(modelRoutePaths, newItem)
    .put(modelRoutePathsWithId, updateItem)["delete"](modelRoutePathsWithId, deleteById);
console.log(router);
/**
 * This function lists all the items in the database, with optional pagination and includes.
 *
 * @param {Context} ctx - The context of the request.
 * @param {Next} next - The next function to be executed.
 */
function listItems(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.state.model.findAll({
                        limit: ctx.request.query.limit ? Number(ctx.request.query.limit) : 50,
                        offset: ctx.request.query.offset ? Number(ctx.request.query.offset) : 0,
                        //@ts-ignore
                        include: ctx.request.query.include ? ctx.request.query.include.split(',') : []
                    })
                        .then(function (items) {
                        ctx.response.status = 200;
                        ctx.response.body = items;
                        next();
                    })["catch"](function (err) {
                        ctx.response.status = 400;
                        ctx.response.body = { message: err.message };
                        next();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Retrieves a single item by ID
 *
 * @param {Context} ctx - the Koa request/response context object
 * @param {Next} next - the Koa next callback
 */
function getById(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.state.model
                        .findByPk(ctx.params.id, {
                        //@ts-ignore
                        include: ctx.request.query.include ? ctx.request.query.include.split(',') : []
                    })["catch"](function (err) {
                        ctx.response.status = 400;
                        ctx.response.body = { message: err.message };
                    })];
                case 1:
                    item = _a.sent();
                    if (item) {
                        ctx.response.status = 200;
                        ctx.response.body = item;
                        next();
                    }
                    else {
                        ctx.response.status = 404;
                        ctx.response.body = { message: 'Not found' };
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Creates a new item in the database
 *
 * @param ctx the Koa request/response context object
 * @param next the Koa next callback
 */
function newItem(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new ctx.state.model(ctx.request.body)
                        .save()
                        .then(function (item) {
                        ctx.response.status = 200;
                        ctx.response.body = item;
                        next();
                    })["catch"](function (err) {
                        ctx.response.status = 400;
                        ctx.response.body = { message: err.message };
                        next();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Updates an existing item in the database
 *
 * @param ctx the Koa request/response context object
 * @param next the Koa next callback
 */
function updateItem(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.state.model
                        .findByPk(ctx.params.id)["catch"](function (err) {
                        ctx.response.status = 400;
                        ctx.response.body = { message: err.message };
                    })];
                case 1:
                    item = _a.sent();
                    if (!item) return [3 /*break*/, 3];
                    return [4 /*yield*/, item
                            .update(ctx.request.body)
                            .then(function (item) {
                            ctx.response.status = 200;
                            ctx.response.body = item;
                            next();
                        })["catch"](function (err) {
                            ctx.response.status = 400;
                            ctx.response.body = { message: err.message };
                            next();
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ctx.response.status = 404;
                    ctx.response.body = { message: 'Not found' };
                    next();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Deletes an item from the database
 *
 * @param ctx the Koa request/response context object
 * @param next the Koa next callback
 */
function deleteById(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.state.model
                        .findByPk(ctx.params.id)["catch"](function (err) {
                        ctx.response.status = 400;
                        ctx.response.body = { message: err.message };
                    })];
                case 1:
                    item = _a.sent();
                    if (!item) return [3 /*break*/, 3];
                    return [4 /*yield*/, item
                            .destroy()
                            .then(function () {
                            ctx.response.status = 204;
                            ctx.response.body = { message: 'Deleted' };
                            next();
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ctx.response.status = 404;
                    ctx.response.body = { message: 'Not found' };
                    next();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = router;
