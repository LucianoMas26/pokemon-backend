"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemon_1 = require("../controllers/pokemon");
const router = express_1.default.Router();
router.get("/offered-pokemons", pokemon_1.getOfferedPokemons);
router.put("/:pokemonId/offer-for-trade", pokemon_1.offerPokemonForTrade);
router.post("/create", pokemon_1.createPokemon);
router.delete("/:pokemonId", pokemon_1.deletePokemon);
router.delete("/:pokemonId/trade", pokemon_1.removeOfferForTrade);
router.get("/:userId/pokemons", pokemon_1.getUserPokemons);
router.post("/:userId/pokemons/random", pokemon_1.addRandomPokemonToUser);
router.post("/new/create", pokemon_1.createNewPokemon);
exports.default = router;
