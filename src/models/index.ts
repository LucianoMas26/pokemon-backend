import User from "./user"
import Pokemon from "./pokemon"
import Trade from "./trade"

User.hasMany(Pokemon, { foreignKey: "userId", as: "pokemons" })
Pokemon.belongsTo(User, { foreignKey: "userId", as: "user" })
Pokemon.hasMany(Trade, {
  foreignKey: "offeringPokemonId",
  as: "offeringTrades"
})

Trade.belongsTo(User, { as: "offeringUser", foreignKey: "offeringUserId" })
Trade.belongsTo(User, { as: "acceptingUser", foreignKey: "acceptingUserId" })
Trade.belongsTo(Pokemon, {
  as: "offeringPokemon",
  foreignKey: "offeringPokemonId"
})
Trade.belongsTo(Pokemon, {
  as: "acceptingPokemon",
  foreignKey: "acceptingPokemonId"
})
export { User, Pokemon, Trade }
