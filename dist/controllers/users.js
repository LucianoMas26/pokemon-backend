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
exports.getUserProfile = exports.loginUser = exports.addUser = exports.getUsersWithPokemons = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const randomPokemon_1 = require("../utils/randomPokemon");
const getUsersWithPokemons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll({
            attributes: ["id", "email"],
            include: {
                model: models_1.Pokemon,
                as: "pokemons",
                attributes: ["id", "name", "level", "type", "abilities", "image"]
            }
        });
        res.json(users);
    }
    catch (error) {
        console.error("Error al obtener usuarios con pokemons:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getUsersWithPokemons = getUsersWithPokemons;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "El email y la contraseña son obligatorios"
        });
    }
    try {
        const existingUser = yield models_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: `Ya existe un usuario con el email ${email}`
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield models_1.User.create({
            email,
            password: hashedPassword
        });
        const pokemons = yield (0, randomPokemon_1.getRandomPokemons)();
        const pokemonPromises = pokemons.map((pokemon) => {
            return models_1.Pokemon.create({
                name: pokemon.name,
                level: pokemon.level,
                type: pokemon.type,
                abilities: pokemon.abilities.join(", "),
                image: pokemon.image,
                userId: newUser.id
            });
        });
        yield Promise.all(pokemonPromises);
        const userWithPokemons = yield models_1.User.findByPk(newUser.id, {
            attributes: ["id", "email", "password"],
            include: [{ model: models_1.Pokemon, as: "pokemons" }]
        });
        const formattedUser = userWithPokemons.toJSON();
        formattedUser.pokemons.forEach((pokemon) => {
            pokemon.abilities = pokemon.abilities.split(", ");
        });
        res.status(201).json(formattedUser);
    }
    catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.User.findOne({
            where: { email: email }
        });
        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }
        const result = yield bcrypt_1.default.compare(password, user.password);
        if (result) {
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: email
            }, process.env.SECRET_KEY);
            res.json(token);
        }
        else {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }
    }
    catch (error) {
        console.error("Error al autenticar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield models_1.User.findByPk(userId, {
            attributes: ["id", "email"],
            include: [{ model: models_1.Pokemon, as: "pokemons" }]
        });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getUserProfile = getUserProfile;
