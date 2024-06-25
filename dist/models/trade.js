"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("./user"));
const pokemon_1 = __importDefault(require("./pokemon"));
class Trade extends sequelize_1.Model {
}
Trade.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    offeringUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id"
        }
    },
    acceptingUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: user_1.default,
            key: "id"
        }
    },
    offeringPokemonId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: pokemon_1.default,
            key: "id"
        }
    },
    acceptingPokemonId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: pokemon_1.default,
            key: "id"
        }
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending"
    }
}, {
    sequelize: config_1.default,
    modelName: "Trade",
    tableName: "trades",
    timestamps: false
});
exports.default = Trade;
