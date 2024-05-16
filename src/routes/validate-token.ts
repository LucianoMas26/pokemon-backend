import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"]
  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    const bearerToken = headerToken.slice(7)
    console.log(bearerToken)
    try {
      const validToken = jwt.verify(bearerToken, process.env.SECRET_KEY!)
      console.log(validToken)
      next()
    } catch (error) {
      res.status(401).json({
        error: "token no valido"
      })
    }
  } else {
    res.status(401).json({
      error: "Acceso denegado"
    })
  }
}
export default validateToken
