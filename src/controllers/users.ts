import { Request, Response } from "express"
import Usuario from "../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const addUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await Usuario.findOne({ where: { email } })

  if (user) {
    return res.status(400).json({
      error: `Ya existe un usuario con el email ${email}`
    })
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await Usuario.create({
      email,
      password: hashedPassword
    })

    res.status(201).json(newUser)
  } catch (error) {
    console.error("Error al agregar usuario:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await Usuario.findOne({
      where: { email: email }
    })

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" })
    }

    const result = await bcrypt.compare(password, user.password)

    if (result) {
      const token = jwt.sign(
        {
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
