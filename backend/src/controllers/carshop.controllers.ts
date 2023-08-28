import { Request, Response } from "express";
import ProductsModel from "../models/Products.model";
import CarShopModel from "../models/CarShop.model";

export default class Carshop extends CarShopModel {
    req: Request;
    res: Response
    productsdb: typeof ProductsModel;
    carshop: typeof CarShopModel

    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.productsdb = ProductsModel;
        this.carshop = CarShopModel;
    }

    viewProductsInCar = async (user: string) => {
        const productscar = await this.carshop.findOne({ user: user })

        this.res.status(200).json(productscar);
    }

    addNewProduct = async (user: string, newproduct: string) => {
        console.log(user);
        
        this.productsdb.findOne({ author: user })
            .then(result => {
                if (result) {
                    this.carshop.findOne({ user: user })
                        .then(async (result) => {
                            if (result) {
                                this.carshop.findOneAndUpdate(
                                    { user: user },
                                    { $push: { products: newproduct } },
                                    { new: true }
                                )
                                    .then((_res) => {
                                        this.res.status(200).send("add new product car");
                                    })
                                    .catch((err) => {
                                        this.res.status(500).send(err);
                                    });
                            } else {
                                const newshop = new this.carshop({
                                    user: user,
                                    products: [newproduct],
                                });
                                await newshop.save();
                                this.res.status(200).send("add new product car");
                            }
                        })
                        .catch((err) => {
                            this.res.status(500).send(`error in db ${err}`);
                        });
                } else {
                    this.res.send(`this user not exist in db`);
                }
            })
            .catch((err) => {
                this.res.status(500).send(`error in db ${err}`);
            });
    }
}