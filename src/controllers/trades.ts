import { Request, Response } from "express"
import { Op } from "sequelize"
import Pokemon from "../models/pokemon"
import Trade from "../models/trade"
import sequelize from "../config"
import { User } from "../models"

export const offerTrade = async (req: Request, res: Response) => {
  const {
    offeringUserId,
    offeringPokemonId,
    acceptingUserId,
    acceptingPokemonId
  } = req.body

  try {
    if (
      isNaN(offeringUserId) ||
      isNaN(offeringPokemonId) ||
      isNaN(acceptingUserId)
    ) {
      return res.status(400).json({ error: "Los IDs deben ser numéricos" })
    }

    const existingTrade = await Trade.findOne({
      where: {
        offeringUserId,
        offeringPokemonId,
        acceptingUserId: {
          [Op.ne]: offeringUserId
        },
        status: "pending"
      }
    })

    if (existingTrade) {
      return res
        .status(400)
        .json({ error: "Ya hay un trade pendiente similar" })
    }

    const existingUser = await User.findByPk(acceptingUserId)
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: `El usuario con ID ${acceptingUserId} no existe` })
    }

    const offeringPokemon = await Pokemon.findByPk(offeringPokemonId)
    if (!offeringPokemon) {
      return res
        .status(404)
        .json({ error: `El Pokémon con ID ${offeringPokemonId} no existe` })
    }

    const acceptingPokemon = await Pokemon.findByPk(acceptingPokemonId)
    if (!acceptingPokemon) {
      return res
        .status(404)
        .json({ error: `El Pokémon con ID ${acceptingPokemonId} no existe` })
    }

    const trade = await Trade.create({
      offeringUserId,
      offeringPokemonId,
      acceptingUserId,
      acceptingPokemonId,
      status: "pending"
    })

    trade.setDataValue("offeringPokemon", {
      id: offeringPokemon.id,
      name: offeringPokemon.name,
      type: offeringPokemon.type
    })

    trade.setDataValue("acceptingPokemon", {
      id: acceptingPokemon.id,
      name: acceptingPokemon.name,
      type: acceptingPokemon.type
    })

    res.json(trade)
  } catch (error) {
    console.error("Error al crear oferta de intercambio:", error)
    res.status(500).json({ error: "Failed to create trade offer" })
  }
}

export const acceptTrade = async (req: Request, res: Response) => {
  const { tradeId, acceptingPokemonId } = req.body

  try {
    const trade = await Trade.findByPk(tradeId)

    if (!trade) {
      return res.status(404).json({ error: "Trade not found" })
    }

    trade.acceptingPokemonId = acceptingPokemonId
    trade.status = "accepted"
    await trade.save()

    const transaction = await sequelize.transaction()

    try {
      const offeringPokemon = await Pokemon.findByPk(trade.offeringPokemonId)
      const acceptingPokemon = await Pokemon.findByPk(acceptingPokemonId)

      if (offeringPokemon && acceptingPokemon) {
        offeringPokemon.userId = trade.acceptingUserId!
        acceptingPokemon.userId = trade.offeringUserId

        await offeringPokemon.save({ transaction })
        await acceptingPokemon.save({ transaction })

        await transaction.commit()
        res.json(trade)
      } else {
        await transaction.rollback()
        res.status(404).json({ error: "Pokemons not found" })
      }
    } catch (error) {
      await transaction.rollback()
      res.status(500).json({ error: "Failed to complete trade" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to accept trade" })
  }
}

export const getPendingTrades = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    if (isNaN(Number(userId))) {
      return res
        .status(400)
        .json({ error: "El ID del usuario debe ser numérico" })
    }

    const trades = await Trade.findAll({
      where: { acceptingUserId: userId, status: "pending" },
      include: [
        { model: User, as: "offeringUser" },
        { model: User, as: "acceptingUser" },
        {
          model: Pokemon,
          as: "offeringPokemon"
        },
        {
          model: Pokemon,
          as: "acceptingPokemon"
        }
      ]
    })

    res.json(trades)
  } catch (error) {
    console.error("Error fetching trades:", error)
    res.status(500).json({ error: "Failed to fetch trades" })
  }
}
