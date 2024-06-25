import { Model, DataTypes } from "sequelize"
import sequelize from "../config"
import User from "./user"
import Pokemon from "./pokemon"

class Trade extends Model {
  public id!: number
  public offeringUserId!: number
  public acceptingUserId!: number | null
  public offeringPokemonId!: number
  public acceptingPokemonId!: number | null
  public status!: string
}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    offeringUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      }
    },
    acceptingUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id"
      }
    },
    offeringPokemonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pokemon,
        key: "id"
      }
    },
    acceptingPokemonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Pokemon,
        key: "id"
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    }
  },
  {
    sequelize,
    modelName: "Trade",
    tableName: "trades",
    timestamps: false
  }
)

export default Trade
