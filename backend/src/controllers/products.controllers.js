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
const Products_model_1 = __importDefault(require("../models/Products.model"));
class ProductsControllers {
    constructor(req, res) {
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productsDB.find();
            this.res.json(products);
        });
        this.createProduct = (name, description, imgURI, author, price, category, arrayImg, buys) => __awaiter(this, void 0, void 0, function* () {
            const newProduct = new this.productsDB({
                name: name,
                description: description,
                imgURI: imgURI,
                author: author,
                price: price,
                category: category,
                arrayImg: arrayImg,
                buys: buys
            });
            yield newProduct.save();
            this.res.json('product create');
        });
        this.updateProduct = (id, name, description, imgURI, author, price, category, arrayImg, buys) => __awaiter(this, void 0, void 0, function* () {
            yield this.productsDB.findByIdAndUpdate(id, {
                name: name,
                description: description,
                imgURI: imgURI,
                author: author,
                price: price,
                category: category,
                arrayImg: arrayImg,
                buys: buys
            });
            this.res.json({ "update id": id });
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.productsDB.findByIdAndDelete(id);
            this.res.json({ "remove id": id });
        });
        this.req = req;
        this.res = res;
        this.productsDB = Products_model_1.default;
    }
}
exports.default = ProductsControllers;
