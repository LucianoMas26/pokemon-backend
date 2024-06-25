import express from "express"
import {
  offerTrade,
  acceptTrade,
  getPendingTrades
} from "../controllers/trades"

const router = express.Router()

router.post("/offer", offerTrade)
router.post("/accept", acceptTrade)
router.get("/pending/:userId", getPendingTrades)

export default router
