import { Model, DataTypes } from "sequelize"
import sequelize from "../config"

class Pokemon extends Model {
  public id!: number
  public name!: string
  public level!: number
  public type!: string
  public abilities!: string
  public userId!: number
  public offerForTrade!: boolean
  public image!: string | null
}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abilities: {
      type: DataTypes.STRING,
      allowNull: false
    },
    offerForTrade: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "Pokemon",
    tableName: "pokemons",
    timestamps: false
  }
)

export default Pokemon
