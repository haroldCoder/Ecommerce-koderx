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
            this.res.json(yield this.productsDB.find());
        });
        this.getProductCategorie = (categorie) => __awaiter(this, void 0, void 0, function* () {
            this.res.json(yield this.productsDB.find({ category: categorie }));
        });
        this.getProductByID = (id, ret = false) => __awaiter(this, void 0, void 0, function* () {
            if (!ret) {
                this.res.json(yield this.productsDB.findById(id));
            }
            else {
                return yield this.productsDB.findById(id);
            }
        });
        this.createProduct = (name, description, imgURI, author, price, category, arrayImg, buys, key_stripe) => __awaiter(this, void 0, void 0, function* () {
            const newProduct = new this.productsDB({
                name: name,
                description: description,
                imgURI: imgURI,
                author: author,
                price: price,
                category: category,
                arrayImg: arrayImg,
                buys: buys,
                key_stripe: key_stripe
            });
            yield newProduct.save();
            this.res.json('product create');
        });
        this.updateProduct = (id, name, description, imgURI, author, price, category, arrayImg, buys, key_stripe) => __awaiter(this, void 0, void 0, function* () {
            yield this.productsDB.findByIdAndUpdate(id, {
                name: name,
                description: description,
                imgURI: imgURI,
                author: author,
                price: price,
                category: category,
                arrayImg: arrayImg,
                buys: buys,
                key_stripe: key_stripe
            });
            this.res.json({ "update id": id });
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.productsDB.findByIdAndDelete(id);
            this.res.json({ "remove id": id });
        });
        this.searchProduct = (searchinp) => __awaiter(this, void 0, void 0, function* () {
            try {
                // user reggex expression for search words similar in the input name
                const nameResults = yield this.productsDB.find({ name: { $regex: searchinp, $options: 'i' } });
                //use reggex expression for search words similar in the input categoria
                const categoryResults = yield this.productsDB.find({ category: { $regex: searchinp, $options: 'i' } });
                // combine result category and name
                const results = [...nameResults, ...categoryResults];
                // if exist the results, return them
                if (results.length > 0) {
                    this.res.status(200).json(results);
                }
                else {
                    // if not found, so not return
                    this.res.status(404);
                }
            }
            catch (err) {
                this.res.status(500).send(err);
            }
        });
        this.getProductsByAuthor = (author) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.res.status(200).json(yield this.productsDB.find({ author: author }));
            }
            catch (err) {
                this.res.status(500).send(err);
            }
        });
        this.req = req;
        this.res = res;
        this.productsDB = Products_model_1.default;
    }
}
exports.default = ProductsControllers;
