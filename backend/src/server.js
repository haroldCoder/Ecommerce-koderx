"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_connect_1 = __importDefault(require("./connection/mongodb_connect"));
const security_middleware_1 = __importDefault(require("./middleware/security.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const authMiddleware = new security_middleware_1.default(process.env.SECRET_KEY);
app.use("/api", require("./routes/products.route"));
app.listen(4500, () => {
    console.log(`Server on port 4500`);
    new mongodb_connect_1.default();
});
