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
class Carshop extends CarShop_model_1.default {
    constructor(req, res) {
        super();
        this.viewProductsInCar = (user) => __awaiter(this, void 0, void 0, function* () {
            const productscar = this.carshop.findOne({ user: user });
            this.res.status(200).json(productscar);
        });
        this.addNewProduct = (user, newproduct) => __awaiter(this, void 0, void 0, function* () {
            this.productsdb.findOne({ name: user }, (err, result) => {
                if (err) {
                    this.res.send(`error in db ${err}`);
                }
                if (result) {
                    this.carshop.findOne({ user: user }, (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            this.res.send(`error in db ${err}`);
                        }
                        if (result) {
                            this.carshop.findOneAndUpdate({ user: user }, { $push: { products: newproduct } }, { new: true }).then((_res) => {
                                this.res.status(200).send("add new product car");
                            }).catch((err) => {
                                this.res.status(500).send(err);
                            });
                        }
                        else {
                            const newshop = new this.carshop({
                                user: user,
                                products: [newproduct]
                            });
                            yield newshop.save();
                            this.res.status(200).send("add new product car");
                        }
                    }));
                }
                else {
                    this.res.send(`this user not exist in db`);
                }
            });
        });
        this.req = req;
        this.res = res;
        this.productsdb = Products_model_1.default;
        this.carshop = CarShop_model_1.default;
    }
}
exports.default = Carshop;
