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
    if (!req.query.categorie) {
        new products_controllers_1.default(req, res).getProducts();
    }
    else {
        new products_controllers_1.default(req, res).getProductCategorie(req.query.categorie);
    }
})
    .post((req, res) => {
    const { name, description, imgURI, author, price, category, arrayImg, buys, key_stripe } = req.body;
    new products_controllers_1.default(req, res).createProduct(name, description, imgURI, author, price, category, arrayImg, buys, key_stripe);
});
router.route("/products/:id")
    .get((req, res) => {
    const { id } = req.params;
    new products_controllers_1.default(req, res).getProductByID(id);
})
    .patch((req, res) => {
    const { id } = req.params;
    const { name, description, imgURI, author, price, category, arrayImg, buys, key_stripe } = req.body;
    new products_controllers_1.default(req, res).updateProduct(parseInt(id), name, description, imgURI, author, price, category, arrayImg, buys, key_stripe);
})
    .delete((req, res) => {
    const { id } = req.params;
    new products_controllers_1.default(req, res).deleteProduct(parseInt(id));
});
router.route("/products/search/:search")
    .get((req, res) => {
    const { search } = req.params;
    new products_controllers_1.default(req, res).searchProduct(search);
});
router.route("/products/author/:author")
    .get((req, res) => {
    const { author } = req.params;
    new products_controllers_1.default(req, res).getProductsByAuthor(author);
});
module.exports = router;
