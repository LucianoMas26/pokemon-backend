import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models"

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" })
  }

  jwt.verify(token, process.env.SECRET_KEY!, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" })
    }
    req.user = decodedToken as User
    next()
  })
}
