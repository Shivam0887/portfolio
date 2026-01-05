"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var better_auth_1 = require("better-auth");
var mongodb_1 = require("better-auth/adapters/mongodb");
var mongodb_2 = require("mongodb");
console.log((_a = process.env) === null || _a === void 0 ? void 0 : _a.MONGODB_URI);
var MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb+srv://shivam:bU2MXk8yPrfX0Bzj@cluster0.rry8tfx.mongodb.net/?appName=Cluster0";
var MONGODB_DB = process.env.MONGODB_DB || "portfolio";
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}
var client = new mongodb_2.MongoClient(MONGODB_URI);
var db = client.db(MONGODB_DB);
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, mongodb_1.mongodbAdapter)(db),
    emailAndPassword: {
        enabled: true,
    },
});
