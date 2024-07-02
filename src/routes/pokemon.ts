import express from "express"
import {
  offerPokemonForTrade,
  getOfferedPokemons,
  createPokemon,
  deletePokemon,
  removeOfferForTrade,
  getUserPokemons,
  addRandomPokemonToUser,
  createNewPokemon
} from "../controllers/pokemon"

const router = express.Router()

router.get("/offered-pokemons", getOfferedPokemons)
router.put("/:pokemonId/offer-for-trade", offerPokemonForTrade)
router.post("/create", createPokemon)
router.delete("/:pokemonId", deletePokemon)
router.delete("/:pokemonId/trade", removeOfferForTrade)
router.get("/:userId/pokemons", getUserPokemons)
router.post("/:userId/pokemons/random", addRandomPokemonToUser)
router.post("/new/create", createNewPokemon)

export default router
