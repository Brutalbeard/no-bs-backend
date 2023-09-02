"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const requestIdHeader = async function (ctx, next) {
    ctx.request.headers['x-no-bs-request-id'] = (0, uuid_1.v4)();
    ctx.response.set('x-no-bs-request-id', ctx.request.headers['x-no-bs-request-id']);
    return next();
};
exports.default = requestIdHeader;
