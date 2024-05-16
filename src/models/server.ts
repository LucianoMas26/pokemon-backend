import express, { Application } from "express"
import { Request, Response } from "express"
import routerProduct from "../routes/products"
import routerUser from "../routes/users"
import db from "../db/connection"
import cors from "cors"

class Server {
  private app: Application
  private port: string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || "3001"
    this.listen()
    this.middlewares()
    this.routes()
    this.dbConnect()
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App corriendo en el puerto ${this.port}`)
    })
  }
  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use("/api/productos", routerProduct)
    this.app.use("/api/usuarios", routerUser)
  }

  async dbConnect() {
    try {
      await db.authenticate()
      console.log("conexion exitosa")
    } catch (error) {
      console.log(error)
      console.log("error al conectarse a la base de datos")
    }
  }
}
export default Server
