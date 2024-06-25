import { Model, DataTypes } from "sequelize"
import sequelize from "../config"
import Pokemon from "./pokemon"

class User extends Model {
  public id!: number
  public email!: string
  public password!: string
  public pokemons!: Pokemon[]
}
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false
  }
)

export default User
