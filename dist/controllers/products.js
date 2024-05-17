"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.default.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.default.findByPk(id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al buscar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield product_1.default.destroy({ where: { id: id } });
        if (deletedProduct) {
            res.json({ message: "Producto eliminado exitosamente" });
        }
        else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.deleteProduct = deleteProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { handle, title, description, sku, grams, stock, price, compareprice, barcode } = req.body;
    try {
        const newProduct = yield product_1.default.create({
            handle,
            title,
            description,
            sku,
            grams,
            stock,
            price,
            compareprice,
            barcode
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { handle, title, description, sku, grams, stock, price, compareprice, barcode } = req.body;
    try {
        const updatedProduct = yield product_1.default.update({
            handle,
            title,
            description,
            sku,
            grams,
            stock,
            price,
            compareprice,
            barcode
        }, {
            where: { id: id }
        });
        if (updatedProduct[0] === 1) {
            res.json({ message: "Producto actualizado exitosamente" });
        }
        else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.updateProduct = updateProduct;
