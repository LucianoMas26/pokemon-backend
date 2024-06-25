"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trades_1 = require("../controllers/trades");
const router = express_1.default.Router();
router.post("/offer", trades_1.offerTrade);
router.post("/accept", trades_1.acceptTrade);
router.get("/pending/:userId", trades_1.getPendingTrades);
exports.default = router;
