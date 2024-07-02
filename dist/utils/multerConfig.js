"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define el directorio de destino para subir archivos
const uploadDir = path_1.default.join(__dirname, "../utils/uploads");
// Verificar si el directorio existe, si no, crearlo
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Usa la ruta uploadDir como directorio de destino
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo: timestamp-originalname
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
