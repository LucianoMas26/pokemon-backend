"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = exports.Pokemon = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const pokemon_1 = __importDefault(require("./pokemon"));
exports.Pokemon = pokemon_1.default;
const trade_1 = __importDefault(require("./trade"));
exports.Trade = trade_1.default;
user_1.default.hasMany(pokemon_1.default, { foreignKey: "userId", as: "pokemons" });
pokemon_1.default.belongsTo(user_1.default, { foreignKey: "userId", as: "user" });
pokemon_1.default.hasMany(trade_1.default, {
    foreignKey: "offeringPokemonId",
    as: "offeringTrades"
});
trade_1.default.belongsTo(user_1.default, { as: "offeringUser", foreignKey: "offeringUserId" });
trade_1.default.belongsTo(user_1.default, { as: "acceptingUser", foreignKey: "acceptingUserId" });
trade_1.default.belongsTo(pokemon_1.default, {
    as: "offeringPokemon",
    foreignKey: "offeringPokemonId"
});
trade_1.default.belongsTo(pokemon_1.default, {
    as: "acceptingPokemon",
    foreignKey: "acceptingPokemonId"
});
