"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongodb_connect_1 = __importDefault(require("./connection/mongodb_connect"));
const security_middleware_1 = __importDefault(require("./middleware/security.middleware"));
const PORT = process.env, dotenv, config;
();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const authMiddleware = new security_middleware_1.default(process.env.SECRET_KEY);
app.use("/api", authMiddleware.authenticate.bind(authMiddleware), require("./routes/products.route"));
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
    new mongodb_connect_1.default();
});
