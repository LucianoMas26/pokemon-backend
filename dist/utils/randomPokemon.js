"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPokemon = exports.getRandomPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const getRandomPokemons = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (count = 3) {
    const promises = [];
    for (let i = 0; i < count; i++) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        promises.push(axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`));
    }
    const responses = yield Promise.all(promises);
    return responses.map((response) => {
        const pokemon = response.data;
        const pokemonId = pokemon.id;
        const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        return {
            name: pokemon.name,
            level: 1,
            type: pokemon.types[0].type.name,
            abilities: pokemon.abilities.map((ability) => ability.ability.name),
            image: officialArtworkUrl
        };
    });
});
exports.getRandomPokemons = getRandomPokemons;
const getRandomPokemon = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = response.data;
    const pokemonId = pokemon.id;
    const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    return {
        name: pokemon.name,
        level: 1,
        type: pokemon.types[0].type.name,
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        image: officialArtworkUrl
    };
});
exports.getRandomPokemon = getRandomPokemon;
