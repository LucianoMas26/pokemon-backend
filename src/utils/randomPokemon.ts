import axios from "axios"

export const getRandomPokemons = async (count: number = 3) => {
  const promises = []
  for (let i = 0; i < count; i++) {
    const randomId = Math.floor(Math.random() * 151) + 1
    promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`))
  }
  const responses = await Promise.all(promises)

  return responses.map((response) => {
    const pokemon = response.data
    const pokemonId = pokemon.id
    const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

    return {
      name: pokemon.name,
      level: 1,
      type: pokemon.types[0].type.name,
      abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
      image: officialArtworkUrl
    }
  })
}

export const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 151) + 1
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${randomId}`
  )
  const pokemon = response.data
  const pokemonId = pokemon.id
  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

  return {
    name: pokemon.name,
    level: 1,
    type: pokemon.types[0].type.name,
    abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
    image: officialArtworkUrl
  }
}
