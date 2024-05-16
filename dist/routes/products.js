"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get("/", validate_token_1.default, products_1.getProducts);
router.get("/:id", products_1.getProduct);
router.delete("/:id", products_1.deleteProduct);
router.post("/", products_1.createProduct);
router.put("/:id", products_1.updateProduct);
exports.default = router;
