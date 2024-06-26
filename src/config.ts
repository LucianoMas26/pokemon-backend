import dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    logging: false,
    native: false
  }
)

export default sequelize
