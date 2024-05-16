import { Router } from "express"
import { addUser, loginUser } from "../controllers/users"

const router = Router()

router.post("/", addUser)
router.post("/login", loginUser)

export default router
