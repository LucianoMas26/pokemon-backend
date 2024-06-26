"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Pokemon extends sequelize_1.Model {
}
Pokemon.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    abilities: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    offerForTrade: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        }
    }
}, {
    sequelize: config_1.default,
    modelName: "Pokemon",
    tableName: "pokemons",
    timestamps: false
});
exports.default = Pokemon;
