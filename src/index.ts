import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import sequelize from "./config"
import routerUser from "./routes/users"
import tradeRoutes from "./routes/trade"
import routerPokemon from "./routes/pokemon"

const PORT = parseInt(process.env.PORT || "3000", 10)
const HOST = "RENDER" in process.env ? "0.0.0.0" : "localhost"
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/users", routerUser)
app.use("/pokemons", routerPokemon)
app.use("/trades", tradeRoutes)

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err)
  })
