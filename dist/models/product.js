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
    handle: {
        type: sequelize_1.DataTypes.STRING
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    sku: {
        type: sequelize_1.DataTypes.STRING
    },
    grams: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    compareprice: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    barcode: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "productos",
    createdAt: false,
    updatedAt: false
});
exports.default = Producto;
