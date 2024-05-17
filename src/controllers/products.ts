import { Request, Response } from "express"
import Producto from "../models/product"

export const getProducts = async (req: Request, res: Response) => {
  const listProducts = await Producto.findAll()

  res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const product = await Producto.findByPk(id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: "Producto no encontrado" })
    }
  } catch (error) {
    console.error("Error al buscar el producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedProduct = await Producto.destroy({ where: { id: id } })

    if (deletedProduct) {
      res.json({ message: "Producto eliminado exitosamente" })
    } else {
      res.status(404).json({ error: "Producto no encontrado" })
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const {
    handle,
    title,
    description,
    sku,
    grams,
    stock,
    price,
    compareprice,
    barcode
  } = req.body

  try {
    const newProduct = await Producto.create({
      handle,
      title,
      description,
      sku,
      grams,
      stock,
      price,
      compareprice,
      barcode
    })

    res.status(201).json(newProduct)
  } catch (error) {
    console.error("Error al crear el producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const {
    handle,
    title,
    description,
    sku,
    grams,
    stock,
    price,
    compareprice,
    barcode
  } = req.body

  try {
    const updatedProduct = await Producto.update(
      {
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compareprice,
        barcode
      },
      {
        where: { id: id }
      }
    )

    if (updatedProduct[0] === 1) {
      res.json({ message: "Producto actualizado exitosamente" })
    } else {
      res.status(404).json({ error: "Producto no encontrado" })
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
