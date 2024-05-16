"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Producto = connection_1.default.define("Producto", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Handle: {
        type: sequelize_1.DataTypes.STRING
    },
    Title: {
        type: sequelize_1.DataTypes.STRING
    },
    Description: {
        type: sequelize_1.DataTypes.STRING
    },
    SKU: {
        type: sequelize_1.DataTypes.STRING
    },
    Grams: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Stock: {
        type: sequelize_1.DataTypes.NUMBER
    },
    Price: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ComparePrice: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Barcode: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Producto;
