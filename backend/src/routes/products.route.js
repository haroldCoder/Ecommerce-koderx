"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_controllers_1 = __importDefault(require("../controllers/products.controllers"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/products")
    .get((req, res) => {
    new products_controllers_1.default(req, res).getProducts();
})
    .post((req, res) => {
    const { name, description, imgURI, author, price, category, arrayImg, buys } = req.body;
    new products_controllers_1.default(req, res).createProduct(name, description, imgURI, author, price, category, arrayImg, buys);
});
router.route("/products/:id")
    .get((req, res) => {
    const { id } = req.params;
    new products_controllers_1.default(req, res).getProductByID(id);
})
    .patch((req, res) => {
    const { id } = req.params;
    const { name, description, imgURI, author, price, category, arrayImg, buys } = req.body;
    new products_controllers_1.default(req, res).updateProduct(parseInt(id), name, description, imgURI, author, price, category, arrayImg, buys);
})
    .delete((req, res) => {
    const { id } = req.params;
    new products_controllers_1.default(req, res).deleteProduct(parseInt(id));
});
module.exports = router;
