import db from "../db/connection"
import { DataTypes, Model } from "sequelize"

interface UsuarioAttributes {
  id?: number // Podría ser opcional dependiendo de tu lógica
  email: string
  password: string
}

class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
  public id!: number // Asegúrate de definir todas las propiedades como públicas
  public email!: string
  public password!: string

  // Aquí puedes definir métodos adicionales si es necesario
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
