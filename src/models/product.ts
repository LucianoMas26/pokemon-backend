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
    Handle: {
      type: DataTypes.STRING
    },
    Title: {
      type: DataTypes.STRING
    },
    Description: {
      type: DataTypes.STRING
    },
    SKU: {
      type: DataTypes.STRING
    },
    Grams: {
      type: DataTypes.DECIMAL
    },
    Stock: {
      type: DataTypes.NUMBER
    },
    Price: {
      type: DataTypes.DECIMAL
    },
    ComparePrice: {
      type: DataTypes.DECIMAL
    },
    Barcode: {
      type: DataTypes.STRING
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
)

export default Producto
