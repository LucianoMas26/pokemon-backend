import { Request, Response } from "express"
import { User, Pokemon } from "../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getRandomPokemons } from "../utils/randomPokemon"

export const getUsersWithPokemons = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"],
      include: {
        model: Pokemon,
        as: "pokemons",
        attributes: ["id", "name", "level", "type", "abilities"]
      }
    })

    res.json(users)
  } catch (error) {
    console.error("Error al obtener usuarios con pokemons:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const addUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: "El email y la contraseña son obligatorios"
    })
  }

  try {
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      return res.status(400).json({
        error: `Ya existe un usuario con el email ${email}`
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      password: hashedPassword
    })

    const pokemons = await getRandomPokemons()
    const pokemonPromises = pokemons.map((pokemon) => {
      return Pokemon.create({
        name: pokemon.name,
        level: pokemon.level,
        type: pokemon.type,
        abilities: pokemon.abilities.join(", "),
        userId: newUser.id
      })
    })

    await Promise.all(pokemonPromises)

    const userWithPokemons = await User.findByPk(newUser.id, {
      attributes: ["id", "email", "password"],
      include: [{ model: Pokemon, as: "pokemons" }]
    })

    const formattedUser = userWithPokemons!.toJSON()
    formattedUser.pokemons.forEach((pokemon: any) => {
      pokemon.abilities = pokemon.abilities.split(", ")
    })

    res.status(201).json(formattedUser)
  } catch (error) {
    console.error("Error al agregar usuario:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: { email: email }
    })

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" })
    }

    const result = await bcrypt.compare(password, user.password)

    if (result) {
      const token = jwt.sign(
        {
          id: user.id,
          email: email
        },
        process.env.SECRET_KEY!
      )

      res.json(token)
    } else {
      return res.status(400).json({ error: "Contraseña incorrecta" })
    }
  } catch (error) {
    console.error("Error al autenticar usuario:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const user = await User.findByPk(userId, {
      attributes: ["id", "email"],
      include: [{ model: Pokemon, as: "pokemons" }]
    })

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    res.json(user)
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
