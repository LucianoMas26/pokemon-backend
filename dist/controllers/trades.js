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
exports.getPendingTrades = exports.acceptTrade = exports.offerTrade = void 0;
const sequelize_1 = require("sequelize");
const pokemon_1 = __importDefault(require("../models/pokemon"));
const trade_1 = __importDefault(require("../models/trade"));
const config_1 = __importDefault(require("../config"));
const models_1 = require("../models");
const offerTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offeringUserId, offeringPokemonId, acceptingUserId, acceptingPokemonId } = req.body;
    try {
        if (isNaN(offeringUserId) ||
            isNaN(offeringPokemonId) ||
            isNaN(acceptingUserId)) {
            return res.status(400).json({ error: "Los IDs deben ser numéricos" });
        }
        const existingTrade = yield trade_1.default.findOne({
            where: {
                offeringUserId,
                offeringPokemonId,
                acceptingUserId: {
                    [sequelize_1.Op.ne]: offeringUserId
                },
                status: "pending"
            }
        });
        if (existingTrade) {
            return res
                .status(400)
                .json({ error: "Ya hay un trade pendiente similar" });
        }
        const existingUser = yield models_1.User.findByPk(acceptingUserId);
        if (!existingUser) {
            return res
                .status(404)
                .json({ error: `El usuario con ID ${acceptingUserId} no existe` });
        }
        const offeringPokemon = yield pokemon_1.default.findByPk(offeringPokemonId);
        if (!offeringPokemon) {
            return res
                .status(404)
                .json({ error: `El Pokémon con ID ${offeringPokemonId} no existe` });
        }
        const acceptingPokemon = yield pokemon_1.default.findByPk(acceptingPokemonId);
        if (!acceptingPokemon) {
            return res
                .status(404)
                .json({ error: `El Pokémon con ID ${acceptingPokemonId} no existe` });
        }
        const trade = yield trade_1.default.create({
            offeringUserId,
            offeringPokemonId,
            acceptingUserId,
            acceptingPokemonId,
            status: "pending"
        });
        trade.setDataValue("offeringPokemon", {
            id: offeringPokemon.id,
            name: offeringPokemon.name,
            type: offeringPokemon.type
        });
        trade.setDataValue("acceptingPokemon", {
            id: acceptingPokemon.id,
            name: acceptingPokemon.name,
            type: acceptingPokemon.type
        });
        res.json(trade);
    }
    catch (error) {
        console.error("Error al crear oferta de intercambio:", error);
        res.status(500).json({ error: "Failed to create trade offer" });
    }
});
exports.offerTrade = offerTrade;
const acceptTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tradeId, acceptingPokemonId } = req.body;
    try {
        const trade = yield trade_1.default.findByPk(tradeId);
        if (!trade) {
            return res.status(404).json({ error: "Trade not found" });
        }
        trade.acceptingPokemonId = acceptingPokemonId;
        trade.status = "accepted";
        yield trade.save();
        const transaction = yield config_1.default.transaction();
        try {
            const offeringPokemon = yield pokemon_1.default.findByPk(trade.offeringPokemonId);
            const acceptingPokemon = yield pokemon_1.default.findByPk(acceptingPokemonId);
            if (offeringPokemon && acceptingPokemon) {
                offeringPokemon.userId = trade.acceptingUserId;
                acceptingPokemon.userId = trade.offeringUserId;
                yield offeringPokemon.save({ transaction });
                yield acceptingPokemon.save({ transaction });
                yield transaction.commit();
                res.json(trade);
            }
            else {
                yield transaction.rollback();
                res.status(404).json({ error: "Pokemons not found" });
            }
        }
        catch (error) {
            yield transaction.rollback();
            res.status(500).json({ error: "Failed to complete trade" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to accept trade" });
    }
});
exports.acceptTrade = acceptTrade;
const getPendingTrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (isNaN(Number(userId))) {
            return res
                .status(400)
                .json({ error: "El ID del usuario debe ser numérico" });
        }
        const trades = yield trade_1.default.findAll({
            where: { acceptingUserId: userId, status: "pending" },
            include: [
                { model: models_1.User, as: "offeringUser" },
                { model: models_1.User, as: "acceptingUser" },
                {
                    model: pokemon_1.default,
                    as: "offeringPokemon"
                },
                {
                    model: pokemon_1.default,
                    as: "acceptingPokemon"
                }
            ]
        });
        res.json(trades);
    }
    catch (error) {
        console.error("Error fetching trades:", error);
        res.status(500).json({ error: "Failed to fetch trades" });
    }
});
exports.getPendingTrades = getPendingTrades;
