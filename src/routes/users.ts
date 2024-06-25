import { Router } from "express"
import {
  addUser,
  loginUser,
  getUsersWithPokemons,
  getUserProfile
} from "../controllers/users"
import { auth } from "../middleware/auth"

const router = Router()

router.get("/", getUsersWithPokemons)
router.post("/register", addUser)
router.post("/login", loginUser)
router.get("/profile", auth, getUserProfile)

export default router
