import { Router } from "express"
import {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct
} from "../controllers/products"
import validateToken from "./validate-token"

const router = Router()

router.get("/", validateToken, getProducts)
router.get("/:id", getProduct)
router.delete("/:id", deleteProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)

export default router
