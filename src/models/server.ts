import express, { Application } from "express"
import { Request, Response } from "express"
import routerProduct from "../routes/products"
import routerUser from "../routes/users"
import db from "../db/connection"
import cors from "cors"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config()

// Importar modelos para que Sequelize los reconozca
import "../models/product"

class Server {
  private app: Application
  private port: string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || "3001"
    this.middlewares()
    this.routes()
    this.dbConnect()
    this.listen()
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
      console.log("Conexión exitosa")

      await db.sync({ force: false })
      console.log("Modelos sincronizados con la base de datos")
    } catch (error) {
      console.error("Error al conectarse a la base de datos:", error)
    }
  }
}

export default Server
