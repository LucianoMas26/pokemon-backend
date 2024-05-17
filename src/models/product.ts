import db from "../db/connection"
import { DataTypes } from "sequelize"

const Producto = db.define(
  "Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    handle: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING
    },
    grams: {
      type: DataTypes.DECIMAL
    },
    stock: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL
    },
    compareprice: {
      type: DataTypes.DECIMAL
    },
    barcode: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "productos",
    createdAt: false,
    updatedAt: false
  }
)

export default Producto
