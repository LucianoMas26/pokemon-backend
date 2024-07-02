"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImage = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const saveImage = function (file) {
    const newPath = `./uploads/${file.originalname}`;
    node_fs_1.default.renameSync(file.path, newPath);
};
exports.saveImage = saveImage;
