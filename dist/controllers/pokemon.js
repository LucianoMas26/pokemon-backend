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
exports.createNewPokemon = exports.addRandomPokemonToUser = exports.getUserPokemons = exports.removeOfferForTrade = exports.deletePokemon = exports.createPokemon = exports.getOfferedPokemons = exports.offerPokemonForTrade = void 0;
const pokemon_1 = __importDefault(require("../models/pokemon"));
const models_1 = require("../models");
const randomPokemon_1 = require("../utils/randomPokemon");
const offerPokemonForTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pokemonId } = req.params;
    try {
        const pokemon = yield pokemon_1.default.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ error: "Pokemon not found" });
        }
        pokemon.offerForTrade = true;
        yield pokemon.save();
        res.json({ message: "Pokemon offered for trade successfully" });
    }
    catch (error) {
        console.error("Error offering pokemon for trade:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.offerPokemonForTrade = offerPokemonForTrade;
const getOfferedPokemons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offeredPokemons = yield pokemon_1.default.findAll({
            where: { offerForTrade: true },
            include: [
                {
                    model: models_1.User,
                    as: "user",
                    attributes: ["id", "email"]
                }
            ],
            attributes: ["id", "name", "level", "type", "abilities", "image"]
        });
        res.json(offeredPokemons);
    }
    catch (error) {
        console.error("Error al obtener pokémons ofrecidos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getOfferedPokemons = getOfferedPokemons;
const createPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, type, abilities, image, userId } = req.body;
    try {
        const newPokemon = yield pokemon_1.default.create({
            name,
            level,
            type,
            abilities,
            image,
            userId,
            offerForTrade: false
        });
        const updatedUser = yield models_1.User.findByPk(userId, {
            include: [pokemon_1.default]
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(201).json(newPokemon);
    }
    catch (error) {
        console.error("Error al crear Pokémon:", error);
        res
            .status(500)
            .json({ error: error.message || "Error interno del servidor" });
    }
});
exports.createPokemon = createPokemon;
const deletePokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pokemonId } = req.params;
    try {
        const pokemon = yield pokemon_1.default.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ error: "Pokémon no encontrado" });
        }
        yield pokemon.destroy();
        res.json({ message: "Pokémon eliminado exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar el Pokémon:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.deletePokemon = deletePokemon;
const removeOfferForTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pokemonId } = req.params;
    try {
        const pokemon = yield pokemon_1.default.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ error: "Pokémon not found" });
        }
        if (!pokemon.offerForTrade) {
            return res
                .status(400)
                .json({ error: "This Pokémon is not currently offered for trade" });
        }
        pokemon.offerForTrade = false;
        yield pokemon.save();
        res.json({ message: "Offer for trade removed successfully" });
    }
    catch (error) {
        console.error("Error removing offer for trade:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.removeOfferForTrade = removeOfferForTrade;
const getUserPokemons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: `User with ID ${userId} not found` });
        }
        const userPokemons = yield pokemon_1.default.findAll({
            where: { userId: user.id },
            attributes: ["id", "name", "level", "type", "abilities", "image"]
        });
        res.json(userPokemons);
    }
    catch (error) {
        console.error("Error retrieving user pokemons:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserPokemons = getUserPokemons;
const addRandomPokemonToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: `User with ID ${userId} not found` });
        }
        const randomPokemon = yield (0, randomPokemon_1.getRandomPokemon)();
        const newPokemon = yield pokemon_1.default.create({
            name: randomPokemon.name,
            level: randomPokemon.level,
            type: randomPokemon.type,
            abilities: randomPokemon.abilities.join(", "),
            image: randomPokemon.image,
            userId: user.id
        });
        res.status(201).json(newPokemon);
    }
    catch (error) {
        console.error("Error adding random Pokémon to user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.addRandomPokemonToUser = addRandomPokemonToUser;
const createNewPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, level, type, abilities, image, userId } = req.body;
    if (!name || !level || !type || !abilities || !image || !userId) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    try {
        const newPokemon = yield pokemon_1.default.create({
            name,
            level,
            type,
            abilities,
            image,
            userId,
            offerForTrade: false
        });
        res.status(201).json(newPokemon);
    }
    catch (error) {
        console.error("Error al crear Pokémon:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createNewPokemon = createNewPokemon;
