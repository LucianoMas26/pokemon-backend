import { Request, Response } from "express"
import Pokemon from "../models/pokemon"
import { User } from "../models"
import { getRandomPokemon } from "../utils/randomPokemon"

export const offerPokemonForTrade = async (req: Request, res: Response) => {
  const { pokemonId } = req.params

  try {
    const pokemon = await Pokemon.findByPk(pokemonId)

    if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" })
    }

    pokemon.offerForTrade = true
    await pokemon.save()

    res.json({ message: "Pokemon offered for trade successfully" })
  } catch (error) {
    console.error("Error offering pokemon for trade:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
export const getOfferedPokemons = async (req: Request, res: Response) => {
  try {
    const offeredPokemons = await Pokemon.findAll({
      where: { offerForTrade: true },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"]
        }
      ],
      attributes: ["id", "name", "level", "type", "abilities", "image"]
    })

    res.json(offeredPokemons)
  } catch (error) {
    console.error("Error al obtener pokémons ofrecidos:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const createPokemon = async (req: Request, res: Response) => {
  const { name, level, type, abilities, image, userId } = req.body

  try {
    const newPokemon = await Pokemon.create({
      name,
      level,
      type,
      abilities,
      image,
      userId,
      offerForTrade: false
    })

    const updatedUser = await User.findByPk(userId, {
      include: [Pokemon]
    })

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    res.status(201).json(newPokemon)
  } catch (error: any) {
    console.error("Error al crear Pokémon:", error)
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" })
  }
}

export const deletePokemon = async (req: Request, res: Response) => {
  const { pokemonId } = req.params

  try {
    const pokemon = await Pokemon.findByPk(pokemonId)

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon no encontrado" })
    }

    await pokemon.destroy()

    res.json({ message: "Pokémon eliminado exitosamente" })
  } catch (error) {
    console.error("Error al eliminar el Pokémon:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const removeOfferForTrade = async (req: Request, res: Response) => {
  const { pokemonId } = req.params

  try {
    const pokemon = await Pokemon.findByPk(pokemonId)

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" })
    }

    if (!pokemon.offerForTrade) {
      return res
        .status(400)
        .json({ error: "This Pokémon is not currently offered for trade" })
    }

    pokemon.offerForTrade = false
    await pokemon.save()

    res.json({ message: "Offer for trade removed successfully" })
  } catch (error) {
    console.error("Error removing offer for trade:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getUserPokemons = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found` })
    }

    const userPokemons = await Pokemon.findAll({
      where: { userId: user.id },
      attributes: ["id", "name", "level", "type", "abilities", "image"]
    })

    res.json(userPokemons)
  } catch (error) {
    console.error("Error retrieving user pokemons:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const addRandomPokemonToUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found` })
    }

    const randomPokemon = await getRandomPokemon()
    const newPokemon = await Pokemon.create({
      name: randomPokemon.name,
      level: randomPokemon.level,
      type: randomPokemon.type,
      abilities: randomPokemon.abilities.join(", "),
      image: randomPokemon.image,
      userId: user.id
    })

    res.status(201).json(newPokemon)
  } catch (error) {
    console.error("Error adding random Pokémon to user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const createNewPokemon = async (req: Request, res: Response) => {
  console.log(req.body)
  const { name, level, type, abilities, image, userId } = req.body

  if (!name || !level || !type || !abilities || !image || !userId) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" })
  }

  try {
    const newPokemon = await Pokemon.create({
      name,
      level,
      type,
      abilities,
      image,
      userId,
      offerForTrade: false
    })

    res.status(201).json(newPokemon)
  } catch (error) {
    console.error("Error al crear Pokémon:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
