"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    authenticate(req, res, next) {
        const { username } = req.query;
        if (!username) {
            return res.status(401).json({ message: 'Token of authentication not provided' });
        }
        else if (username !== process.env.SECRET_KEY) {
            return res.status(500).json({ message: 'Token invalid' });
        }
        jsonwebtoken_1.default.sign({ username }, this.secretKey, { expiresIn: '1h' });
        next();
    }
}
exports.default = AuthMiddleware;
