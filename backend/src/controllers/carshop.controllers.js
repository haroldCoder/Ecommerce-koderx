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
const CarShop_model_1 = __importDefault(require("../models/CarShop.model"));
const products_controllers_1 = __importDefault(require("./products.controllers"));
const mongoose_1 = __importDefault(require("mongoose"));
class Carshop extends CarShop_model_1.default {
    constructor(req, res) {
        super();
        this.viewProductsInCar = (user) => __awaiter(this, void 0, void 0, function* () {
            const productscar = yield this.carshop.findOne({ user: user });
            this.res.status(200).json(productscar);
        });
        this.addNewProduct = (user, newproduct) => __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            this.carshop.findOne({ user: user })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result) {
                    this.carshop.findOneAndUpdate({ user: user }, { $push: { products: newproduct } }, { new: true })
                        .then((_res) => {
                        this.res.status(200).send("add new product car");
                    })
                        .catch((err) => {
                        this.res.status(500).send(err);
                    });
                }
                else {
                    const newshop = new this.carshop({
                        user: user,
                        products: [newproduct],
                    });
                    yield newshop.save();
                    this.res.status(200).send("add new product car");
                }
            }))
                .catch((err) => {
                this.res.status(500).send(`error in db ${err}`);
            });
        });
        this.returnProductsByIds = (arraysId) => __awaiter(this, void 0, void 0, function* () {
            const products = new products_controllers_1.default(this.req, this.res);
            const newArray = [];
            yield Promise.all(arraysId.map((e, index) => __awaiter(this, void 0, void 0, function* () {
                const product = yield products.getProductByID(e, true);
                newArray[index] = {
                    id: product === null || product === void 0 ? void 0 : product.id,
                    name: product === null || product === void 0 ? void 0 : product.name,
                    price: product === null || product === void 0 ? void 0 : product.price,
                    imgURI: product === null || product === void 0 ? void 0 : product.imgURI,
                    key_stripe: product === null || product === void 0 ? void 0 : product.key_stripe
                };
            })));
            // Luego, envía la respuesta después de que todas las Promesas se hayan resuelto
            this.res.status(200).json(newArray);
        });
        this.deleteProductcarShop = (id, user) => __awaiter(this, void 0, void 0, function* () {
            this.carshop.findOne({ user: user }).then((res) => {
                if (res) {
                    this.carshop.findOneAndUpdate({ user: user }, { $pull: { products: id } }, { new: true })
                        .then(() => {
                        this.res.status(200).send("product delete");
                    })
                        .catch(() => {
                        this.res.status(500).send("error in to db");
                    });
                }
                else {
                    this.res.status(500).send('user not found in db');
                }
            }).catch(err => {
                console.log(err);
                this.res.status(500).send('an ocurre error in db');
            });
        });
        this.EmptyProduct = (id, user) => {
            this.carshop.findOne({ user: user, products: new mongoose_1.default.Types.ObjectId(id) })
                .then((res) => {
                if (res) {
                    this.res.status(200).send("product exist in carshop");
                }
                else {
                    this.res.status(404).send("product not exist in carshop");
                }
            })
                .catch((err) => {
                this.res.status(500).send(err);
            });
        };
        this.req = req;
        this.res = res;
        this.productsdb = Products_model_1.default;
        this.carshop = CarShop_model_1.default;
    }
}
exports.default = Carshop;
