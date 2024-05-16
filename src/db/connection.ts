import dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()

const dbName = process.env.DB_NAME ?? "nombre_por_defecto"
const dbUser = process.env.DB_USER ?? "usuario_por_defecto"
const dbPassword = process.env.DB_PASSWORD ?? "contraseña_por_defecto"
const dbHost = process.env.DB_HOST ?? "localhost"

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false
})

export default sequelize
