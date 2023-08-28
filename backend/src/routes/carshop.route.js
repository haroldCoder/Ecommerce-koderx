"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carshop_controllers_1 = __importDefault(require("../controllers/carshop.controllers"));
const router = (0, express_1.Router)();
router.route("/carshop/:user")
    .get((req, res) => {
    const { user } = req.params;
    new carshop_controllers_1.default(req, res).viewProductsInCar(user);
});
router.route("/carshop")
    .post((req, res) => {
    const { user, newProduct } = req.body;
    new carshop_controllers_1.default(req, res).addNewProduct(user, newProduct);
});
module.exports = router;
