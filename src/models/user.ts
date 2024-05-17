import db from "../db/connection"
import { DataTypes, Model } from "sequelize"

interface UsuarioAttributes {
  id?: number
  email: string
  password: string
}

class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
  public id!: number
  public email!: string
  public password!: string
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false
  }
)
export default Usuario
