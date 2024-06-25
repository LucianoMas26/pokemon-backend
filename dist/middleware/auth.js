"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }
        req.user = decodedToken;
        next();
    });
};
exports.auth = auth;
