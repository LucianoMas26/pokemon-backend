"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const users_1 = __importDefault(require("./routes/users"));
const trade_1 = __importDefault(require("./routes/trade"));
const pokemon_1 = __importDefault(require("./routes/pokemon"));
const PORT = process.env.DB_PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/users", users_1.default);
app.use("/pokemons", pokemon_1.default);
app.use("/trades", trade_1.default);
config_1.default
    .sync({ alter: true })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
});
