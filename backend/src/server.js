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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_connect_1 = __importDefault(require("./connection/mongodb_connect"));
const security_middleware_1 = __importDefault(require("./middleware/security.middleware"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4500;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const authMiddleware = new security_middleware_1.default(process.env.SECRET_KEY);
app.use("/api", authMiddleware.authenticate.bind(authMiddleware), require("./routes/products.route"));
app.use("/api", authMiddleware.authenticate.bind(authMiddleware), require("./routes/carshop.route"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbConnection = new mongodb_connect_1.default();
            yield dbConnection.connection;
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.error('Error starting the server:', error);
        }
    });
}
startServer();
