"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const dbName = (_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : "nombre_por_defecto";
const dbUser = (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : "usuario_por_defecto";
const dbPassword = (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : "contraseña_por_defecto";
const dbHost = (_d = process.env.DB_HOST) !== null && _d !== void 0 ? _d : "localhost";
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: false
});
exports.default = sequelize;
